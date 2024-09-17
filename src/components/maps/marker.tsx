'use client'

import React from "react";
import { Marker, MarkerProps, Popup } from "react-leaflet";
import type { LocationEntity } from "@/utils/interfaces";
import { IoLocation } from "react-icons/io5";
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { useTheme } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import "leaflet/dist/leaflet.css";
import "./maps.css";

export interface AppMapsMarkerProps extends Omit<MarkerProps, "position" | "icon">{
    location: LocationEntity,
    description?: string,
    icon?: IconType
}

export default function AppMapsMarker({ location, description, icon, ...props }: AppMapsMarkerProps): React.ReactElement{
    const theme = useTheme();

    const defaultIcon: L.DivIcon = React.useMemo(()=> {
        const IconComponent: IconType = icon || IoLocation;

        return new L.DivIcon({
            html: ReactDOMServer.renderToString(
                <IconComponent 
                    color={`${theme.colors.primary}`}
                    style={{
                        width: 50,
                        height: 50
                    }}
                />
            ),
            className: "mapsMarker"
        });

    }, [theme, icon]);
    
    return (
        <Marker
            position={[
                parseFloat(location.latitude.toString()), 
                parseFloat(location.longitude.toString())
            ]}
            icon={defaultIcon}
            {...props}
        >
            {description && <Popup>{description}</Popup>}
        </Marker>
    )
}