'use client'

import React from "react";
import { TbBus } from "react-icons/tb";
import AppMaps from "@/components/maps";
import AppMapsMarker from "@/components/maps/marker";
import type { LocationEntity, VehicleEntity } from "@/utils/interfaces";
import WebSocketUtils from "@/utils/websocket";
import AppModal, { type AppModalProps } from "@/components/modal";



export interface VehicleMapsModalProps extends Omit<AppModalProps, "children">{
    selectedVehicle?: VehicleEntity
}

export default function VehicleMapsModal({
    selectedVehicle,
    ...props
}: VehicleMapsModalProps): React.ReactElement{
    const websocket: WebSocket | void = React.useMemo<WebSocket | void>(()=> {
        return selectedVehicle && WebSocketUtils.createSocket({
            url: `/vehicle/${selectedVehicle.uuid}/location`
        })
    }, [selectedVehicle]);

    const [location, setLocation] = React.useState<LocationEntity>({
        latitude: 0,
        longitude: 0
    });

    React.useEffect(()=> {
        if(!websocket) return;

        websocket.addEventListener("message", (messageEvent) => {
            const data: LocationEntity = WebSocketUtils.captureMessageEventData<LocationEntity>(messageEvent);
    
            setLocation(data);
        });
    }, [websocket]);

    React.useEffect(()=> {
        if(!props.open && websocket)
            websocket.close();
        
    }, [props.open, websocket]);

    return (
        <AppModal
            {...props}
            buttonsProps={{
                buttonConfirmProps: {
                    hidden: true
                }
            }}
        >
            <AppMaps
                style={{
                    minWidth: 500,
                    minHeight: 500
                }}
                center={location}
            >
                <AppMapsMarker
                    location={location}
                    icon={TbBus}
                />
            </AppMaps>
        </AppModal>
        
    )
}