'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Stack } from "@chakra-ui/react";
import AppModal, { AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import { PointEntity } from "@/utils/interfaces";
import { createOrUpdatePoint, PointActionProps } from "./actions";
import { TbWorldSearch } from "react-icons/tb";
import AppButton from "@/components/button";
import AppTable, { AppTableBodyItemProps } from "@/components/table";
import { pointsTableHeader, getItemsOfPoints } from "./shared";
import { mockPoints } from "./mock";



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

    const [body, setBody] = React.useState<AppTableBodyItemProps<PointEntity>[]>([]);

    const [formState, formAction ] = useFormState<PointActionProps, FormData>(createOrUpdatePoint, {
        finish: false
    });

    const buttonConfirmDescription: string = React.useMemo<string>(()=> {
        return pointState.uuid ? "Alterar" : "Cadastrar"
    }, [pointState]);

    React.useEffect(()=> {
        
        setPointState(selectedPoint || pointDefault);
    }, [selectedPoint]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    function handlePointState(data: Partial<PointEntity>): void{
        setPointState({ ...pointState, ...data });
    }

    React.useEffect(()=> {
        setBody(mockPoints.map(point => ({
            data: point,
            items: getItemsOfPoints(point)
        })))
    }, []);

    return (
        <AppModal
            {...props}
            onClose={onClose}
            title="Cadastro de pontos"
            buttonsProps={{
                buttonConfirmDescription,
                buttonConfirmProps: {
                    type: "submit"
                }
            }}
        >
            <Stack
                width="full"
                direction="column"
                spacing={10}
            >
                <AppForm action={formAction}>
                    <Stack
                        width="full"
                        spacing={5}
                    >
                        <AppInput
                            variant="filled"
                            type="text"
                            name="addressCity"
                            label="Endereço"
                            color="secondary"
                            _placeholder={{color: "secondary"}}
                            placeholder="Digite o CEP, estado, rua ou outras informações..."
                            value={pointState.addressCity}
                            onChange={({ target: { value }}) => handlePointState({addressCity: value })}
                        />
                        <AppButton 
                            width="auto"
                            backgroundColor="blue.400"
                            color="black"
                            borderColor="blue.400"
                            borderWidth={1}
                            fontSize={18}
                            rightIcon={<TbWorldSearch fontSize={25}/>}
                            _hover={{
                                backgroundColor: "black",
                                color: "blue.400"
                            }}
                        >
                            Localizar coordenadas
                        </AppButton>
                        <AppInput
                            type="hidden"
                            name="pointUuid"
                            value={pointState.uuid}
                        />
                    </Stack>
                </AppForm>
                <AppTable
                    body={body}
                    header={pointsTableHeader}
                />
            </Stack>
        </AppModal>
    );
}