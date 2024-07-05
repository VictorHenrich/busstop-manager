'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Stack } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import { PointEntity } from "@/utils/interfaces";
import { searchLocations, type SearchLocationsActionProps } from "./actions";
import { TbWorldSearch } from "react-icons/tb";
import AppButton from "@/components/button";
import AppTable, { type AppTableBodyItemProps } from "@/components/table";
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
}; 

export default function PointEditionModal({
    selectedPoint,
    onClose,
    ...props
}: PointEditionModalProps): React.ReactElement{
    const [body, setBody] = React.useState<AppTableBodyItemProps<PointEntity>[]>([]);

    const [formState, formAction ] = useFormState<SearchLocationsActionProps, FormData>(searchLocations, {
        finish: false
    });

    const [selectedLocation, setSelectedLocation] = React.useState<AppTableBodyItemProps<PointEntity>>();

    const pointState: PointEntity = React.useMemo(()=> {
        return !selectedPoint ? pointDefault : selectedPoint
    }, [selectedPoint]);

    const addressDescription: string = React.useMemo(()=> {
        if(!pointState.uuid) return ""

        return (
            `${pointState.addressStreet}, ${pointState.addressNumber}, ` +
            `${pointState.addressNeighborhood}, ${pointState.addressState}`
        );

    }, [pointState]);

    const buttonConfirmDescription: string = React.useMemo<string>(()=> {
        return pointState.uuid ? "Alterar" : "Cadastrar"
    }, [pointState]);

    React.useEffect(()=> {
        setBody(mockPoints.map((point, index) => ({
            data: point,
            items: getItemsOfPoints(point),
            id: `locationItem${index}`
        })))
    }, []);

    React.useEffect(()=> {
        if(!props.open)
            setSelectedLocation(undefined);
    }, [props]);

    function handleSelectItem(item: AppTableBodyItemProps<PointEntity>): void{
        setSelectedLocation(
            selectedLocation && selectedLocation.id === item.id
                ? undefined
                : item
        )
    }

    return (
        <AppModal
            {...props}
            onClose={onClose}
            title="Cadastro de pontos"
            buttonsProps={{
                buttonConfirmDescription
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
                            value={addressDescription}
                        />
                        <AppButton 
                            width="auto"
                            type="submit"
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
                    </Stack>
                </AppForm>
                <AppTable
                    body={body}
                    isSelectable={true}
                    selectedItem={selectedLocation}
                    onSelectItem={handleSelectItem}
                    header={pointsTableHeader}
                />
            </Stack>
        </AppModal>
    );
}