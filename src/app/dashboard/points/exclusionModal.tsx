'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Text } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import type { PointEntity } from "@/utils/interfaces";
import { deletePoint, type SearchLocationsActionProps } from "./actions";



export interface PointExclusionModalProps extends Omit<AppModalProps, "children">{
    selectedPoint?: Pick<PointEntity, "uuid">
}


export default function PointExclusionModal({
    selectedPoint,
    onClose,
    ...props
}: PointExclusionModalProps){
    const [formState, formAction] = useFormState<SearchLocationsActionProps, FormData>(deletePoint, { finish: false });

    const point: Pick<PointEntity, "uuid"> = React.useMemo(()=> {
        return selectedPoint || { uuid: "" }
    }, [selectedPoint]);

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
                <Text color="tertiary">Você tem deseja realizar a exclusão deste Ponto?</Text>
                <AppInput 
                    type="hidden"
                    name="pointUuid"
                    value={point.uuid}
                />
            </AppForm>
        </AppModal>
    )
}