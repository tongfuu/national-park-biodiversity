import React, { memo } from 'react';

import allStates from "../data/allstates.json";

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const markers = [
  { markerOffset: 15, name: "Acadia", coordinates: [44.35, -68.21] },
  { markerOffset: 15, name: "Arches", coordinates: [38.68, -109.57] },
];




export const MapChart = ({ setTooltipContent }) => {

  return (
    <>
      <ComposableMap 
      data-tip="" 
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 700 }}
      width={980}
      height={551}
      style={{
      width: "100%",
      height: "auto",
   }}
      >
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

          {/* {markers.map(({ name, coordinates, markerOffset }) => (

            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {name}
              </text>
            </Marker>
          ))} */}



        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};