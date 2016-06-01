/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.ViewerFullRenderer = mobxReact.observer(function viewer_swatch (props) {

		var store = props.store;
		return React.DOM.div({
				className: 'swatch-viewer',
				style: {width: 'auto'}
			},
			// React.createElement(mobxDevtools.default),
			React.DOM.h1(null, store.title),
			React.DOM.button({
				onClick: function () {
					addRandomSwatches(500);
				}
			}, 'Add 500 swatches.'),
			React.DOM.button({
				onClick: function () {
					store.toggleAnimation();
				}
			}, 'Toggle Animation.'),
			React.createElement(Swatch.selectedSwatchRenderer, {
				selectedSwatch: store.selectedSwatch
			}),
			React.DOM.div({style: {position: 'absolute', left: store.leftPosition + 'px'}},
				React.createElement(Swatch.swatchGroupRenderer, {
					swatches: store.swatches,
					setSelectedSwatch: store.setSelectedSwatch
				})
			)
		);
	});

	Swatch.selectedSwatchRenderer = mobxReact.observer(function selectedSwatch_swatch (props) {

		var selectedSwatch = props.selectedSwatch;

		return React.DOM.div({
				className: 'selected-swatch-container'
			},
			React.DOM.img({
				height: 260,
				width: 260,
				alt: selectedSwatch.name,
				className: 'selected-swatch-image',
				src: selectedSwatch.image + '?wid=260&hei=260'
			}),

			React.DOM.strong({
				className: 'selected-swatch-name'
			}, selectedSwatch.name)
		);

	});

	Swatch.swatchGroupRenderer = mobxReact.observer(function swatchGroup_swatch (props) {

		return React.DOM.div({
				className: 'swatch-container'
			},
			props.swatches.map(function (swatch) {
				return React.createElement(Swatch.swatchThumbnailRenderer, {
					key: swatch.materialId,
					swatch: swatch,
					setSelectedSwatch: props.setSelectedSwatch
				});
			}, this)
		);
	});

	Swatch.swatchThumbnailRenderer = mobxReact.observer(React.createClass({
		displayName: 'swatch-thumbNail-swatch',
		render: function () {
			var swatch = this.props.swatch;
			var className = 'swatch' + (swatch.selected ? ' selected' : '');

			return React.DOM.div({
					className: className,
					key: swatch.materialId,
					onClick: this.swatchClickHandler
				},
				React.DOM.img({
					height: 31,
					width: 31,
					alt: swatch.name,
					src: swatch.image + '?wid=31&hei=31'
				})
			);
		},
		swatchClickHandler: function () {
			console.log('swatch id: ' + this.props.swatch.materialId);
			this.props.setSelectedSwatch(this.props.swatch.materialId);
		}
	}));

}());