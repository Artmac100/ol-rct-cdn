import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const london = window.ol.proj.fromLonLat([-0.12755, 51.507222]);

	  // Set map center here [default: london]
      const view = new window.ol.View({
        center: london,
        zoom: 6
      });






	// *** Begin drawing initialization
	// Init features source
    const source = new window.ol.source.Vector({wrapX: false});

    // Create layer for features
    const vector = new window.ol.layer.Vector({
        source: source,

		// Default style in you need

        /*style: new window.ol.style.Style({
            fill: new window.ol.style.Fill({
                color: FEATURE_FILL_COLOR_BK
            }),
            stroke: new window.ol.style.Stroke({
                color: FEATURE_STROKE_COLOR_BK,
                width: FEATURE_STROKE_WIDTH
            }),
            image: new window.ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: FEATURE_IMAGE_OPACITY,
                src: objectIconsEnum.POINT36
            }))
        })*/
    });
	// *** End drawing initialization





	  // Create map
      const map = new window.ol.Map({
        target: 'map',
        layers: [
          new window.ol.layer.Tile({
            preload: 4,
            source: new window.ol.source.OSM()
          }),
		  vector // Drawing layer
        ],
        loadTilesWhileAnimating: true,
        view: view
      });




	  // Map search
	   const geocoder = new window.Geocoder('nominatim', {
        provider: 'osm',
        lang: 'en',
        placeholder: 'Search...',
        limit: 20,
        debug: false,
		targetType: 'text-input',
        autoComplete: true,
        keepOpen: true,
        countrycodes: 'gb',
		featureStyle: new window.ol.style.Style({
            image: new window.ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
            })),
        })
    });
    map.addControl(geocoder);

	geocoder.on('addresschosen', function (evt) {
		console.log(evt)
    });




	  // Point style
    const style = new window.ol.style.Style({
            image: new window.ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
            })),
            text: new window.ol.style.Text({
                offsetY: 10,
                text: 'coordinates: [-0.12755, 51.507222]',
                font: '12px Open Sans,sans-serif',
                fill: new window.ol.style.Fill({color: 'red'}),
                stroke: new window.ol.style.Stroke({color: '#eee', width: 0})
            })
        });


	// Point coordinates
    const schladmingWebMercator = window.ol.proj.fromLonLat([-0.12755, 51.507222]);

	// Create feature with geometry 'Point'
    const feature = new window.ol.Feature({
        geometry: new window.ol.geom.Point(schladmingWebMercator),
        name: 'NAME OF POINT'
    });

	// Set style for created feature
    feature.setStyle(style);

	// Draw feature on map
    source.addFeature(feature);
  }

  render() {
    return (
      <div className="App">
        <div className="map" id="map"></div>
      </div>
    );
  }
}

export default App;
