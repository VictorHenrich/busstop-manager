'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Spinner, Stack } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import AppInput, { AppInputProps } from "@/components/input";
import AppForm from "@/components/form";
import { PointEntity } from "@/utils/interfaces";
import { searchLocations, type SearchLocationsActionProps } from "./actions";
import { TbWorldSearch } from "react-icons/tb";
import AppButton from "@/components/button";
import AppTable, { type AppTableBodyItemProps } from "@/components/table";
import { pointsTableHeader, getItemsOfPoints } from "./shared";



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
    const inputRef = React.useRef<AppInputProps>();

    const [openLoadingSearchPoint, setOpenLoadingSearchPoint] = React.useState<boolean>(false);
    
    const [body, setBody] = React.useState<AppTableBodyItemProps<PointEntity>[]>([]);

    const [searchAddressState, formAction ] = useFormState<SearchLocationsActionProps, FormData>(searchLocations, {
        finish: false
    });

    const [selectedLocation, setSelectedLocation] = React.useState<AppTableBodyItemProps<PointEntity>>();

    const [locations, setLocations] = React.useState<PointEntity[]>([]);

    const iconSearchPoint: React.ReactElement = React.useMemo<React.ReactElement>(()=> {
        return !openLoadingSearchPoint
            ? <TbWorldSearch fontSize={25}/>
            : <Spinner color="inherit"/>

    }, [openLoadingSearchPoint]);

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
        setBody(locations.map((point, index) => ({
            data: point,
            items: getItemsOfPoints(point),
            id: `locationItem${index}`
        })))
    }, [locations]);

    React.useEffect(()=> {
        if(!props.open){
            setLocations([]);
            setSelectedLocation(undefined);
        }

        if(props.open && selectedPoint)
            setTimeout(()=> {
                if(!inputRef.current) return;

                inputRef.current.value = addressDescription;
            })
    }, [props, addressDescription, selectedPoint]);

    React.useEffect(()=> {
        if(searchAddressState.locations)
            setLocations(searchAddressState.locations);

        setOpenLoadingSearchPoint(false);
    }, [searchAddressState]);

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
                            name="addressDescription"
                            label="Endereço"
                            color="secondary"
                            _placeholder={{color: "secondary"}}
                            _focus={{
                                color: "primary"
                            }}
                            placeholder="Digite o CEP, estado, rua ou outras informações..."
                        />
                        <AppButton 
                            width="auto"
                            type="submit"
                            backgroundColor="blue.400"
                            color="black"
                            borderColor="blue.400"
                            borderWidth={1}
                            fontSize={18}
                            rightIcon={iconSearchPoint}
                            _hover={{
                                backgroundColor: "black",
                                color: "blue.400"
                            }}
                            onClick={()=> setOpenLoadingSearchPoint(true)}
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