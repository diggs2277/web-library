'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { itemProp } = require('../../constants/item');

const ItemDetailsTabs = require('./details/tabs');
const ItemDetailsInfoView = require('./details/info-view');
const ItemDetailsInfoSelected = require('./details/info-selected');

class ItemDetails extends React.Component {
	render() {
		return (
			<section className={ `item-details ${this.props.active ? 'active' : ''}` }>
				{
				'key' in this.props.item ? (
						<ItemDetailsTabs { ...this.props } />
					) : (
						this.props.selectedItemKeys.length ? (
							<ItemDetailsInfoSelected { ...this.props } />
						) : (
							<ItemDetailsInfoView { ...this.props } />
						)
					)
				}
			</section>
		);
	}
}

ItemDetails.defaultProps = {
	item: {},
	active: false,
	selectedItemKeys: []
};

ItemDetails.propTypes = {
	active: PropTypes.bool,
	item: itemProp,
	selectedItemKeys: PropTypes.array
};

module.exports = ItemDetails;
