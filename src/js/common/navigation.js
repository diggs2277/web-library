'use strict';

const getQueryFromRoute = match => {
	const { collection, tags, search = '' } = match.params;
	return { collection, tag: tagsFromUrlPart(tags), q: search };
}

const tagsFromUrlPart = tags => tags ? tags.split(/\b,\b/).map(t => t.replace(/,,/g, ',')) : [];

const tagsToUrlPart = tags => tags.map(t => t.replace(/,/g, ',,'));

const makePath = ({ library = null, collection = null, items = null, trash = false, tags = null, search = null, view = null } = {}) => {
	const path = [];
	if(library && library.substr(0, 1) === 'g') {
		path.push(library)
	}

	if(trash) {
		path.push('trash')
	} else if(collection) {
		path.push('collection', collection);
	}

	if(tags && tags.length) {
		if(Array.isArray(tags)) {
			tags.sort();
			path.push('tags', tagsToUrlPart(tags).join());
		} else {
			path.push('tags', tags);
		}
	}

	if(search) {
		path.push('search', search);
	}

	if(items && items.length) {
		if(Array.isArray(items)) {
			path.push('items', items.join(','));
		} else {
			path.push('items', items);
		}
	}

	if(view) {
		path.push(view);
	}


	return '/' + path.join('/');
}

module.exports = { makePath, getQueryFromRoute, tagsFromUrlPart, tagsToUrlPart };
