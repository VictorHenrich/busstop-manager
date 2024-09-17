'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Text } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import type { ActionProps, VehicleEntity } from "@/utils/interfaces";
import { deleteVehicle } from "./actions";



export interface VehicleExclusionModalProps extends Omit<AppModalProps, "children">{
    selectedVehicle?: Pick<VehicleEntity, "uuid">
}


export default function VehicleExclusionModal({
    selectedVehicle,
    onClose,
    ...props
}: VehicleExclusionModalProps){
    const [formState, formAction] = useFormState<ActionProps, FormData>(deleteVehicle, { finish: false });

    const vehicle: Pick<VehicleEntity, "uuid"> = React.useMemo(()=> {
        return selectedVehicle || { uuid: "" }
    }, [selectedVehicle]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    return (
        <AppModal
            onClose={onClose}
            title="Aviso"
            buttonsProps={{
                buttonConfirmProps: {
                    type: "submit",
                    backgroundColor: "red"
                }
            }}
            {...props}
        >
            <AppForm action={formAction}>
                <Text color="tertiary">Você tem deseja realizar a exclusão deste veículo?</Text>
                <AppInput 
                    type="hidden"
                    name="vehicleUuid"
                    value={vehicle.uuid}
                />
            </AppForm>
        </AppModal>
    )
}