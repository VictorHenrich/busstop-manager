'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import type { VehicleEntity } from "@/utils/interfaces";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";
import { mockVehicles } from "./mock";
import AppSelect from "@/components/select";
import { VehicleEditionModal } from "./editionModal";
import VehicleExclusionModal from "./exclusionModal";
import VehicleMapsModal from "./mapsModal";



function VehiclePage(): React.ReactElement{
    const [body, setBody] = React.useState<AppTableBodyItemProps<VehicleEntity>[]>([]);

    const header: AppTableItemProps[] = [
        {
            value: "Placa",
        },
        {
            value: "Tipo de veículo"
        },
        {
            value: "Ação"
        }
    ]

    const [openEditionModal, setOpenEditionModal] = React.useState<boolean>(false);

    const [openExclusionModal, setOpenExclusionModal] = React.useState<boolean>(false);

    const [openMapsModal, setOpenMapsModal] = React.useState<boolean>(false);

    const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleEntity>();

    function getItemsOfVehicle(vehicle: VehicleEntity): AppTableItemProps[]{
        return [
            { value: vehicle.plate },
            { value: vehicle.type },
            { value: (
                <AppMenuList 
                    items={[
                        {
                            description: "Visualizar no Mapa", 
                            id: "map",
                            onClick: ()=> {
                                setOpenMapsModal(true);

                                setSelectedVehicle(vehicle);
                            }
                        },
                        {
                            description: "Alterar", 
                            id: "update",
                            onClick: ()=> {
                                setOpenEditionModal(true);

                                setSelectedVehicle(vehicle);
                            }
                        },
                        {
                            description: "Excluir", 
                            id: "delete",
                            onClick: ()=> {
                                setOpenExclusionModal(true);

                                setSelectedVehicle(vehicle);
                            }
                        },
                    ]}
                />
            ),
            align: "center"
            }
        ]
    }

    React.useEffect(()=> {
        setBody(mockVehicles.map(vehicle => ({
            data: vehicle,
            items: getItemsOfVehicle(vehicle)
        })))
    }, []);

    return (
        <Stack
            width="full"
            height="full"
            direction="column"
            align="center"
            spacing={10}
        >
            <AppForm>
                <Wrap 
                    spacing={5} 
                    justify="center" 
                    align="end"
                >
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Placa" 
                            minWidth={500}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppSelect
                            items={[
                                {
                                    description: "Carro",
                                    value: "car"
                                },
                                {
                                    description: "Moto",
                                    value: "motorcycle"
                                },
                                {
                                    description: "Ônibos",
                                    value: "bus"
                                }
                            ]}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppButton  
                            minWidth={150}
                            rightIcon={<FaSearch />}
                        >
                            Pesquisar
                        </AppButton>
                    </WrapItem>
                    <WrapItem>
                        <AppButton 
                            minWidth={150}
                            rightIcon={<MdAddCircle />}
                        >
                            Cadastrar Novo
                        </AppButton>
                    </WrapItem>
                </Wrap>
            </AppForm>
            <AppTable
                header={header}
                body={body}
            />
            <VehicleEditionModal 
                open={openEditionModal}
                onClose={()=> setOpenEditionModal(false)}
                selectedVehicle={selectedVehicle}
            />
            <VehicleExclusionModal 
                open={openExclusionModal}
                onClose={()=> setOpenExclusionModal(false)}
                selectedVehicle={selectedVehicle}
            />
            <VehicleMapsModal 
                open={openMapsModal}
                onClose={()=> setOpenMapsModal(false)}
                selectedVehicle={selectedVehicle}
            />
        </Stack>
    )
}

export default React.memo(VehiclePage);