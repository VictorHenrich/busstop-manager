'use client'

import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { LocationEntity } from "@/utils/interfaces";



export interface AppMapsProps extends Partial<Omit<MapContainerProps, "center">>{
    center: LocationEntity
}

export default function AppMaps({children, center, ...props}: AppMapsProps): React.ReactElement{
    React.useEffect(() => {

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
      }, []);

    return (
        <MapContainer
            zoom={13}
            scrollWheelZoom={false}
            style={{
                width: "100%",
                height: "100%"
            }}
            center={[
                parseFloat(center.latitude.toString()),
                parseFloat(center.longitude.toString())
            ]}
            {...props}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">_  </a>'
            />
            {children}
        </MapContainer>
    )
}