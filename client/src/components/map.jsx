import React, { memo } from 'react';

import ReactTooltip from "react-tooltip";

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

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export const MapChart = ({ setTooltipContent }) => {

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

                    const state_name = allStates.find(s => s.val === geo.id);
                    setTooltipContent(`${state_name.id}`);

                  }}
                //   onMouseLeave={() => {

                //   }}
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