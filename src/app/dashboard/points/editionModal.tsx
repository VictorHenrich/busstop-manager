'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Stack } from "@chakra-ui/react";
import AppModal, { AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import { PointEntity } from "@/utils/entities";
import { createOrUpdatePoint, PointActionProps } from "./actions";



export interface PointEditionModalProps extends Omit<AppModalProps, "children">{
    selectedPoint?: PointEntity
}

const pointDefault: PointEntity = {
    addressState: "",
    addressCity: "",
    addressNeighborhood: "",
    addressStreet: "",
    addressNumber: "",
    latitude: "",
    longitude: "",
    uuid: ""
}; 

export default function PointEditionModal({
    selectedPoint,
    onClose,
    ...props
}: PointEditionModalProps): React.ReactElement{
    const [pointState, setPointState] = React.useState<PointEntity>(pointDefault);

    const [formState, formAction ] = useFormState<PointActionProps, FormData>(createOrUpdatePoint, {
        finish: false
    });

    function handlePointState(data: Partial<PointEntity>): void{
        setPointState({ ...pointState, ...data });
    }

    React.useEffect(()=> {
        
        setPointState(selectedPoint || pointDefault);
    }, [selectedPoint]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    return (
        <AppModal
            {...props}
            onClose={onClose}
            title="Cadastro de pontos"
            buttonsProps={{
                buttonConfirmDescription: "Cadastrar",
                buttonConfirmProps: {
                    type: "submit"
                }
            }}
        >
            <AppForm action={formAction}>
                <Stack
                    width="full"
                    spacing={5}
                >
                    <AppInput 
                        type="text"
                        name="addressState"
                        label="UF"
                        value={pointState.addressState}
                        onChange={({ target: { value }}) => handlePointState({addressState: value })}
                    />
                    <AppInput 
                        type="text"
                        name="addressCity"
                        label="Cidade"
                        value={pointState.addressCity}
                        onChange={({ target: { value }}) => handlePointState({addressCity: value })}
                    />
                    <AppInput 
                        type="text"
                        name="addressNeighborhood"
                        label="Bairro"
                        value={pointState.addressNeighborhood}
                        onChange={({ target: { value }}) => handlePointState({addressNeighborhood: value })}
                    />
                    <AppInput 
                        type="text"
                        name="addressStreet"
                        label="Rua"
                        value={pointState.addressStreet}
                        onChange={({ target: { value }}) => handlePointState({addressStreet: value })}
                    />
                    <AppInput 
                        type="text"
                        name="addressNumber"
                        label="Numero"
                        value={pointState.addressNumber}
                        onChange={({ target: { value }}) => handlePointState({addressNumber: value })}
                    />
                    <AppInput 
                        type="hidden"
                        name="pointUuid"
                        value={pointState.uuid}
                    />
                </Stack>
            </AppForm>
        </AppModal>
    );
}