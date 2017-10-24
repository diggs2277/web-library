'use strict';

/**
 * Marks collections as selected/open based on current path
 * @param  {Array} collections Flat list of collections
 * @param  {Array} path        A list of keys containing currently selected collection
 *                             and all of its parents in reverse order (i.e. selected
 *                             collection key is the last element of the array)
 * @return {Array}             Flat list of collections annotated with isSelected 
 *                             and isOpen properties
 */
const applyPathToCollections = (collections, path) => {
	return collections.map(c => {
		let index = path.indexOf(c.key);
		c.isSelected = index >= 0 && index === path.length - 1;
		if(index >= 0 && index < path.length - 1) {
			c.isOpen = true;
		} else if(index !== -1) {
			c.isOpen = false;
		}
		
		return c;
	});
};

const enhanceCollections = (collections, path = []) => {
	var childMap = {};
	collections.forEach(col => {
		if(col.parentCollection) {
			if(!(col.parentCollection in childMap)) {
				childMap[col.parentCollection] = [];
			}
			childMap[col.parentCollection].push(col.key);
		}
	});

	collections.forEach(col => {
		col.hasChildren = col.key in childMap;
		col.children = childMap[col.key] || [];
	});

	return applyPathToCollections(collections, path);
};

/**
 * Returns a unique compund key for item/collection
 */
const ck = (itemOrCollectionKey, libraryKey) => {
	return itemOrCollectionKey + libraryKey;
};

const splice = (array, at, count = 0, ...items) => {
	if (at == null) {
		at = array.length;
	}

	return [
		...array.slice(0, at),
		...items,
		...array.slice(at + count)
	];
};

const get = (src, path, fallback) => {
	if(src === null) {
		return fallback;
	}
	if(!path || !path.length) {
		return src;
	}

	const parts = Array.isArray(path) ? path : path.split('.');
	
	var obj = src;
	var i, ii;

	for(i = 0, ii = parts.length; i < ii; i++) {
		if(!obj.propertyIsEnumerable(parts[i])) {
			return fallback;
		}

		obj = obj[parts[i]];

		if(obj === null) {
			return (i !== ii - 1) ? fallback : obj;
		}
	}

	return obj;
};

const transform = (src, path, f, fallback = {}) => {
	return f(get(src, path) || fallback);
};

const noop = () => {};

module.exports = { 
	ck,
	enhanceCollections,
	get,
	noop,
	splice,
	transform
};