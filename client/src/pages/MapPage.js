import React, { memo } from 'react';

import { Navigation } from "../components/navigation";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { geoCentroid } from "d3-geo";

import { get_parks } from '../fetcher'

import allStates from "../data/allstates.json";

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";


function Map() {
	const [content, setContent] = useState("");
	return (
	  <div>
    <Navigation />
		<MapChart setTooltipContent={setContent} />
		<ReactTooltip>{content}</ReactTooltip>
	  </div>
	);
  }


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ setTooltipContent }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const state = allStates.find(s => s.val === geo.id);

                    // var stateResults = get_parks(state);
                    // console.log(stateResults);

                    setTooltipContent(`${state.id}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};


export default Map;