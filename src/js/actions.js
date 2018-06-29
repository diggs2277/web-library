const cache = require('zotero-api-client-cache');
const api = require('zotero-api-client')().use(cache()).api;

const { get } = require('./utils');

var queueIdCunter = 0;

//@TODO: merge meta into items
//item[Symbol.for('meta')] = action.meta[i];

const {
	CONFIGURE_API,
	REQUEST_META,
	RECEIVE_META,
	ERROR_META,

	ROUTE_CHANGE,

	SELECT_LIBRARY,
	SELECT_ITEM,

	REQUEST_ITEMS_IN_COLLECTION,
	RECEIVE_ITEMS_IN_COLLECTION,
	ERROR_ITEMS_IN_COLLECTION,

	REQUEST_COLLECTIONS_IN_LIBRARY,
	RECEIVE_COLLECTIONS_IN_LIBRARY,
	ERROR_COLLECTIONS_IN_LIBRARY,

	PRE_UPDATE_ITEM,
	REQUEST_UPDATE_ITEM,
	RECEIVE_UPDATE_ITEM,
	ERROR_UPDATE_ITEM,

	PRE_CREATE_ITEM,
	REQUEST_CREATE_ITEM,
	RECEIVE_CREATE_ITEM,
	ERROR_CREATE_ITEM,

	REQUEST_UPLOAD_ATTACHMENT,
	RECEIVE_UPLOAD_ATTACHMENT,
	ERROR_UPLOAD_ATTACHMENT,

	REQUEST_DELETE_ITEM,
	RECEIVE_DELETE_ITEM,
	ERROR_DELETE_ITEM,

	REQUEST_DELETE_ITEMS,
	RECEIVE_DELETE_ITEMS,
	ERROR_DELETE_ITEMS,

	REQUEST_ITEM_TYPE_CREATOR_TYPES,
	RECEIVE_ITEM_TYPE_CREATOR_TYPES,
	ERROR_ITEM_TYPE_CREATOR_TYPES,

	REQUEST_ITEM_TYPE_FIELDS,
	RECEIVE_ITEM_TYPE_FIELDS,
	ERROR_ITEM_TYPE_FIELDS,

	REQUEST_ITEM_TEMPLATE,
	RECEIVE_ITEM_TEMPLATE,
	ERROR_ITEM_TEMPLATE,

	REQUEST_CHILD_ITEMS,
	RECEIVE_CHILD_ITEMS,
	ERROR_CHILD_ITEMS,

	REQUEST_FETCH_ITEMS,
	RECEIVE_FETCH_ITEMS,
	ERROR_FETCH_ITEMS,

	REQUEST_TOP_ITEMS,
	RECEIVE_TOP_ITEMS,
	ERROR_TOP_ITEMS,

	SORT_ITEMS,

	PREFERENCE_CHANGE,

	TRIGGER_EDITING_ITEM,
	TRIGGER_RESIZE_VIEWPORT
} = require('./constants/actions');

// @TODO: rename and move to common/api
const cleanupCacheAfterDelete = (itemKeys, state) => {
	const libraryKey = state.current.library;
	const itemsByCollection = get(state, ['libraries', libraryKey, 'itemsByCollection']);;
	const itemsByParent = get(state, ['libraries', libraryKey, 'itemsByParent']);
	const itemsTop = get(state, ['libraries', libraryKey, 'itemsTop']);

	// cleanup relevant caches
	itemKeys.forEach(key => {
		Object.entries(itemsByCollection)
		.forEach(([collectionKey, itemsInCollectionKeys]) => {
			if(itemsInCollectionKeys.includes(key)) {
				api().invalidate({
					'resource.library': libraryKey,
					'resource.collections': collectionKey,
				});
			}
		});

		Object.entries(itemsByParent)
		.forEach(([ parentKey, itemsInParentKeys]) => {
			if(itemsInParentKeys.includes(key)) {
				api().invalidate({
					'resource.library': libraryKey,
					'resource.items': parentKey,
					'resource.children': null
				});
			}
		});

		if(itemsTop.find(topItemKey => topItemKey === key)) {
			api().invalidate({
				'resource.library': libraryKey,
				'resource.items': null,
				'resource.top': null
			});
		}
	});
};

const changeRoute = params => {
	return {
		type: ROUTE_CHANGE,
		params
	};
};

const configureApi = (userId, apiKey, apiConfig = {}) => {
	return {
		type: CONFIGURE_API,
		apiKey,
		userId,
		apiConfig
	};
};

const sortItems = (sortBy, sortDirection) => {
	return {
		type: SORT_ITEMS,
		sortBy,
		sortDirection
	};
};

//@TODO: separate authenticate and selectLibrary events
//		 allow having multiple open libraries as per design
const selectLibrary = (type, id) => {
	return {
		type: SELECT_LIBRARY,
		libraryKey: api().library(type, id).getConfig().resource.library
	};
};

const preferenceChange = (name, value) => {
	return {
		type: PREFERENCE_CHANGE,
		name,
		value
	};
}

const initialize = () => {
	return async (dispatch, getState) => {
		const { config: apiConfig } = getState();
		dispatch({
			type: REQUEST_META
		});

		try {
			const [itemTypes, itemFields, creatorFields] = (await Promise.all([
				api(null, apiConfig).itemTypes().get(),
				api(null, apiConfig).itemFields().get(),
				api(null, apiConfig).creatorFields().get()
			])).map(response => response.getData());
			dispatch({
				type: RECEIVE_META,
				itemTypes, itemFields, creatorFields
			});
		} catch(error) {
			dispatch({
				type: ERROR_META,
				error
			});
			throw error;
		}
	};
};

const fetchCollections = (libraryKey) => {
	return async (dispatch, getState) => {
		dispatch({
			type: REQUEST_COLLECTIONS_IN_LIBRARY,
			libraryKey
		});
		try {
			const { config } = getState();
			const response = await api(config.apiKey, config.apiConfig).library(libraryKey).collections().get();
			const collections = response.getData();
			collections.sort(
				(a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
			);

			dispatch({
				type: RECEIVE_COLLECTIONS_IN_LIBRARY,
				receivedAt: Date.now(),
				libraryKey,
				collections,
				response
			});
			return collections;
		} catch(error) {
			dispatch({
				type: ERROR_COLLECTIONS_IN_LIBRARY,
				libraryKey,
				error
			});
			throw error;
		}
	};
};

const fetchItemsInCollection = (collectionKey, { start = 0, limit = 50, sort = 'dateModified', direction = "desc" } = {}) => {
	return async (dispatch, getState) => {
		const state = getState();
		const config = state.config;
		const libraryKey = state.current.library;
		const totalItemsCount = get(state, ['libraries', libraryKey, 'itemCountByCollection', collectionKey]);
		const knownItemKeys = get(state, ['libraries', libraryKey, 'itemsByCollection', collectionKey], []);

		if(knownItemKeys.length === totalItemsCount) {
			return knownItemKeys.map(key => get(state, ['libraries', libraryKey, 'items', key]))
		}

		dispatch({
			type: REQUEST_ITEMS_IN_COLLECTION,
			libraryKey,
			collectionKey
		});

		try {
			let response = await api(config.apiKey, config.apiConfig)
				.library(libraryKey)
				.collections(collectionKey)
				.items()
				.top()
				.get({ start, limit, sort, direction });

			let items = response.getData();
			let meta = response.getMeta();

			dispatch({
				type: RECEIVE_ITEMS_IN_COLLECTION,
				libraryKey,
				receivedAt: Date.now(),
				collectionKey,
				items,
				meta,
				response,
			});

			return items;
		} catch(error) {
			dispatch({
				type: ERROR_ITEMS_IN_COLLECTION,
				libraryKey,
				collectionKey,
				error
			});

			throw error;
		}
	};
};

const fetchItemTypeCreatorTypes = (itemType) => {
	return async (dispatch, getState) => {
		dispatch({
			type: REQUEST_ITEM_TYPE_CREATOR_TYPES,
			itemType
		});
		let config = getState().config;
		try {
			let creatorTypes = (await api(config.apiKey, config.apiConfig).itemTypeCreatorTypes(itemType).get()).getData();
			dispatch({
				type: RECEIVE_ITEM_TYPE_CREATOR_TYPES,
				itemType,
				creatorTypes
			});
			return creatorTypes;
		} catch(error) {
			dispatch({
				type: ERROR_ITEM_TYPE_CREATOR_TYPES,
				error,
				itemType
			});
			throw error;
		}
	};
};

const fetchItemTypeFields = (itemType) => {
	return async (dispatch, getState) => {
		dispatch({
			type: REQUEST_ITEM_TYPE_FIELDS,
			itemType
		});
		let config = getState().config;
		try {
			let fields = (await api(config.apiKey, config.apiConfig).itemTypeFields(itemType).get()).getData();
			dispatch({
				type: RECEIVE_ITEM_TYPE_FIELDS,
				itemType,
				fields
			});
			return fields;
		} catch(error) {
			dispatch({
				type: ERROR_ITEM_TYPE_FIELDS,
				itemType,
				error
			});
			throw error;
		}
	};
};

const fetchItemTemplate = (itemType, opts = {}) => {
	return async (dispatch, getState) => {
		dispatch({
			type: REQUEST_ITEM_TEMPLATE,
			itemType
		});
		let config = getState().config;
		try {
			let template = (await api(config.apiKey, config.apiConfig).template(itemType).get(opts)).getData();
			dispatch({
				type: RECEIVE_ITEM_TEMPLATE,
				itemType,
				template
			});
			return template;
		} catch(error) {
			dispatch({
				type: ERROR_ITEM_TEMPLATE,
				itemType,
				error
			});
			throw error;
		}
	};
};

const fetchChildItems = (itemKey, libraryKey) => {
	return async (dispatch, getState) => {
		let config = getState().config;
		libraryKey = libraryKey || get(getState(), 'current.library');
		dispatch({
			type: REQUEST_CHILD_ITEMS,
			itemKey,
			libraryKey
		});

		try {
			let response = await api(config.apiKey, config.apiConfig).library(libraryKey).items(itemKey).children().get();
			let childItems = response.getData();
			let meta = response.getMeta();

			dispatch({
				type: RECEIVE_CHILD_ITEMS,
				itemKey,
				libraryKey,
				childItems,
				meta,
				response
			});
		} catch(error) {
			dispatch({
				type: ERROR_CHILD_ITEMS,
				error,
				itemKey,
				libraryKey
			});
		}
	};
};

//@TODO: This will fail if itemKeys.length > 50
//@TODO: It probably makes sense to skip itemKeys that already exists in state.items
const fetchItems = (itemKeys, libraryKey) => {
	return async (dispatch, getState) => {
		let config = getState().config;
		libraryKey = libraryKey || get(getState(), 'current.library');
		dispatch({
			type: REQUEST_FETCH_ITEMS,
			itemKeys,
			libraryKey
		});

		try {
			let response = await api(config.apiKey, config.apiConfig)
				.library(libraryKey)
				.items()
				.get({
				itemKey: itemKeys.join(',')
			});

			let items = response.getData();
			let meta = response.getMeta();

			dispatch({
				type: RECEIVE_FETCH_ITEMS,
				itemKeys,
				libraryKey,
				items,
				meta,
				response
			});
		} catch(error) {
			dispatch({
				type: ERROR_FETCH_ITEMS,
				error,
				itemKeys,
				libraryKey
			});
		}
	};
};

const fetchTopItems = ({ start = 0, limit = 50, sort = 'dateModified', direction = 'desc' }) => {
	return async (dispatch, getState, ) => {
		const state = getState();
		const libraryKey = state.current.library;
		const totalItemsCount = get(state, ['itemCountTopByLibrary', libraryKey]);
		const knownItemKeys = get(state, ['libraries', libraryKey, 'itemsTop'], []);

		if(knownItemKeys.length === totalItemsCount) {
			// there is no need for a request
			return knownItemKeys.map(key => get(state, ['libraries', libraryKey, 'items', key]))
		}

		dispatch({
			type: REQUEST_TOP_ITEMS,
			libraryKey
		});

		try {
			let response = await api(state.config.apiKey, state.config.apiConfig)
				.library(libraryKey)
				.items()
				.top()
				.get({ start, limit, sort, direction });

			let items = response.getData();
			let meta = response.getMeta();

			dispatch({
				type: RECEIVE_TOP_ITEMS,
				libraryKey,
				items,
				meta,
				response
			});
			return items;
		} catch(error) {
			dispatch({
				type: ERROR_TOP_ITEMS,
				error,
				libraryKey
			});
		}
	};
};

const triggerEditingItem = (itemKey, isEditing) => {
	return async (dispatch, getState) => {
		let libraryKey = get(getState(), 'current.library');

		return dispatch({
			type: TRIGGER_EDITING_ITEM,
			itemKey,
			libraryKey,
			isEditing
		});
	}
};

const triggerResizeViewport = (width, height) => {
	return {
		type: TRIGGER_RESIZE_VIEWPORT,
		width,
		height
	};
};

function createItem(properties) {
	return async (dispatch, getState) => {
		// dispatch({
		// 	type: PRE_CREATE_ITEM,
		// 	properties
		// });
		const state = getState();
		const libraryKey = get(getState(), 'current.library');
		const config = state.config;
		dispatch({
			type: REQUEST_CREATE_ITEM,
			libraryKey,
			properties
		});

		try {
			let response = await api(config.apiKey, config.apiConfig).library(libraryKey).items().post([properties]);
			if(!response.isSuccess()) {
				throw response.getErrors()[0];
			}

			dispatch({
				type: RECEIVE_CREATE_ITEM,
				libraryKey,
				item: response.getEntityByIndex(0)
			});
			if(properties.parentItem) {
				api().invalidate({
					'resource.items': properties.parentItem,
					'resource.children': null
				});
			}
			return response.getEntityByIndex(0);
		} catch(error) {
			dispatch({
					type: ERROR_CREATE_ITEM,
					error,
					libraryKey,
					properties,
				});
			throw error;
		}
	};
}

function deleteItem(item) {
	return async (dispatch, getState) => {
		const state = getState();
		const libraryKey = get(getState(), 'current.library');
		const config = getState().config;

		dispatch({
			type: REQUEST_DELETE_ITEM,
			libraryKey,
			item
		});

		try {
			await api(config.apiKey, config.apiConfig)
			.library(libraryKey).items(item.key).version(item.version).delete();
			// search in state, add to action
			dispatch({
				type: RECEIVE_DELETE_ITEM,
				libraryKey,
				item
			});
			cleanupCacheAfterDelete([item.key], state);
		} catch(error) {
			dispatch({
					type: ERROR_DELETE_ITEM,
					error,
					libraryKey,
					item,
				});
			throw error;
		}
	};
}

function deleteItems(itemKeys) {
	return async (dispatch, getState) => {
		const state = getState();
		const libraryKey = get(getState(), 'current.library');
		const { config } = getState(state);

		dispatch({
			type: REQUEST_DELETE_ITEMS,
			libraryKey,
			itemKeys
		});

		try {
			await api(config.apiKey, config.apiConfig)
			.library(libraryKey).items().delete(itemKeys);
			dispatch({
				type: RECEIVE_DELETE_ITEMS,
				libraryKey,
				itemKeys
			});
			cleanupCacheAfterDelete(itemKeys, state);
		} catch(error) {
			dispatch({
					type: ERROR_DELETE_ITEMS,
					error,
					libraryKey,
					itemKeys,
				});
			throw error;
		}
	};
}

function updateItem(itemKey, patch) {
	return async (dispatch, getState) => {
		const libraryKey = get(getState(), 'current.library');
		const queueId = ++queueIdCunter;

		dispatch({
			type: PRE_UPDATE_ITEM,
			itemKey,
			libraryKey,
			patch,
			queueId
		});

		if('itemType' in patch) {
			// when changing itemType, we may need to remove some fields
			// from the patch to avoid 400. Usually these are the base-mapped
			// fields from the source type that are illegal in the target type
			await dispatch(
				fetchItemTypeFields(patch.itemType)
			);

			let itemTypeFields = get(getState(), ['meta', 'itemTypeFields', patch.itemType]);
			if(itemTypeFields) {
				itemTypeFields = [
					'itemType',
					...itemTypeFields.map(fieldDetails => fieldDetails.field)
				];
				Object.keys(patch).forEach(patchedKey => {
					if(!itemTypeFields.includes(patchedKey)) {
						delete patch[patchedKey];
					}
				});
			}
		}

		dispatch(
			queueUpdateItem(itemKey, patch, libraryKey, queueId)
		);
	};
}

function queueUpdateItem(itemKey, patch, libraryKey, queueId) {
	return {
		queue: libraryKey + itemKey,
		callback: async (next, dispatch, getState) => {
			const state = getState();
			const libraryKey = state.current.library;
			const config = state.config;
			const item = get(state, ['libraries', libraryKey, 'items', itemKey]);
			const version = item.version;

			dispatch({
				type: REQUEST_UPDATE_ITEM,
				itemKey,
				libraryKey,
				patch,
				queueId
			});

			try {
				const response = await api(config.apiKey, config.apiConfig).library(libraryKey).items(itemKey).version(version).patch(patch);
				const updatedItem = {
					...item,
					...response.getData()
				};

				// invalidate child items for any collection of this item
				if(updatedItem.collections) {
					for(var collectionKey of updatedItem.collections) {
						api().invalidate({
							'resource.collections': collectionKey,
							'resource.items': null
						});
					}
				}

				// invalidate child items for the parent of this item
				if(updatedItem.parentItem) {
					api().invalidate({
						'resource.items': updatedItem.parentItem,
						'resource.children': null
					});
				}

				// invalidate this item
				api().invalidate('resource.items', itemKey);

				// invalidate top items of this library
				api().invalidate({
					'resource.library': libraryKey,
					'resource.items': null,
					'resource.top': null
				});

				dispatch({
					type: RECEIVE_UPDATE_ITEM,
					item: updatedItem,
					itemKey,
					libraryKey,
					patch,
					queueId
				});

				return updatedItem;
			} catch(error) {
				dispatch({
					type: ERROR_UPDATE_ITEM,
					error,
					itemKey,
					libraryKey,
					patch,
					queueId
				});
				throw error;
			} finally {
				next();
			}
		}
	};
}

function uploadAttachment(itemKey, fileData) {
	return async (dispatch, getState) => {
		const state = getState();
		const libraryKey = get(getState(), 'current.library');
		const config = state.config;
		dispatch({
			type: REQUEST_UPLOAD_ATTACHMENT,
			libraryKey,
			itemKey,
			fileData,
		});

		try {
			let response = await api(config.apiKey, config.apiConfig)
				.library(libraryKey)
				.items(itemKey)
				.attachment(fileData.fileName, fileData.file)
				.post();

			dispatch({
				type: RECEIVE_UPLOAD_ATTACHMENT,
				libraryKey,
				itemKey,
				fileData,
				response,
			});
		} catch(error) {
			dispatch({
				type: ERROR_UPLOAD_ATTACHMENT,
				libraryKey,
				itemKey,
				fileData,
				error,
			});
			throw error;
		}
	};
}

module.exports = {
	changeRoute,
	configureApi,
	createItem,
	deleteItem,
	deleteItems,
	fetchChildItems,
	fetchCollections,
	fetchItems,
	fetchItemsInCollection,
	fetchItemTemplate,
	fetchItemTypeCreatorTypes,
	fetchItemTypeFields,
	fetchTopItems,
	initialize,
	preferenceChange,
	selectLibrary,
	sortItems,
	triggerEditingItem,
	triggerResizeViewport,
	updateItem,
	uploadAttachment,
};
