(function( $ ) {
	'use strict';
	/*
	Sales Selector
	*/
	$('#salesSelector').themePluginMultiSelect().on('change', function() {
		var rel = $(this).val();
		$('#salesSelectorItems .chart').removeClass('chart-active').addClass('chart-hidden');
		$('#salesSelectorItems .chart[data-sales-rel="' + rel + '"]').addClass('chart-active').removeClass('chart-hidden');
	});
	$('#salesSelector').trigger('change');
	$('#salesSelectorWrapper').addClass('ready');
	$('#meterSales').liquidMeter({
		shape: 'circle',
		color: '#0088cc',
		background: '#F9F9F9',
		fontSize: '24px',
		fontWeight: '600',
		stroke: '#F2F2F2',
		textColor: '#333',
		liquidOpacity: 0.9,
		liquidPalette: ['#333'],
		speed: 3000,
		animate: !$.browser.mobile
	});

	$('#meterSalesSel a').on('click', function( ev ) {
		ev.preventDefault();
		var val = $(this).data("val"),
			selector = $(this).parent(),
			items = selector.find('a');
		items.removeClass('active');
		$(this).addClass('active');
		// Update Meter Value
		$('#meterSales').liquidMeter('set', val);
	});

	/*
	Flot: Real-Time
	*/
	(function() {
		var data = [],
			totalPoints = 300;

		function getRandomData() {
			if (data.length > 0)
				data = data.slice(1);
			// Do a random walk
			while (data.length < totalPoints) {
				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;
				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}
				data.push(y);
			}
			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}
			return res;
		}
	})();
	/*
	Map
	*/
	var vectorMapDashOptions = {
		map: 'world_en',
		backgroundColor: null,
		color: '#FFFFFF',
		hoverOpacity: 0.7,
		selectedColor: '#005599',
		enableZoom: true,
		borderWidth:1,
		showTooltip: true,
		values: sample_data,
		scaleColors: ['#0088cc'],
		normalizeFunction: 'polynomial'
	};
	}).apply( this, [ jQuery ]);