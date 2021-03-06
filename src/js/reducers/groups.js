'use strict';

const {
	RECEIVE_GROUPS,
} = require('../constants/actions.js');

const version = (state = [], action) => {
	switch(action.type) {
		case RECEIVE_GROUPS:
			return action.groups;
		default:
			return state;
	}
};

module.exports = version;
