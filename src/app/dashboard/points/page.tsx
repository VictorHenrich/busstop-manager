'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import { PointEntity } from "@/utils/interfaceses";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { mockPoints } from "./mock";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";
import PointEditionModal from "./editionModal";
import PointExclusionModal from "./exclusionModal";



function PointsPage(): React.ReactElement{
    const [openEditionModal, setOpenEditionModal] = React.useState<boolean>(false);

    const [openExclusionModal, setOpenExclusionModal] = React.useState<boolean>(false);

    const [ selectedPoint, setSelectedPoint ] = React.useState<PointEntity>();

    const [body, setBody] = React.useState<AppTableBodyItemProps<PointEntity>[]>([]);

    const header: AppTableItemProps[] = [
        {
            value: "Estado (UF)",
        },
        {
            value: "Cidade"
        },
        {
            value: "Bairro"
        },
        {
            value: "Rua"
        },
        {
            value: "Numero"
        },
        {
            value: "Coordenadas",
            align: "center"
        },
        {
            value: "Ações",
            align: "center"
        }
    ]

    function getItemsOfPoints(point: PointEntity): AppTableItemProps[]{
        return [
            { value: point.addressState },
            { value: point.addressCity },
            { value: point.addressNeighborhood },
            { value: point.addressStreet },
            { value: point.addressNumber },
            { value: `(${point.latitude}, ${point.longitude})`, align: "center"},
            { value: (
                <AppMenuList 
                    items={[
                        {
                            description: "Visualizar no Mapa", 
                            id: "see",
                            onClick: ()=> handleSeeMapOfPoint(point)
                        },
                        {
                            description: "Alterar", 
                            id: "update",
                            onClick: ()=> handleUpdatePoint(point)
                        },
                        {
                            description: "Excluir", 
                            id: "delete",
                            onClick: ()=> handleDeletePoint(point)
                        },
                    ]}
                />
            ),
            align: "center"
            }
        ]
    }

    function handleDeletePoint(point: PointEntity): void{
        setOpenExclusionModal(true);
        setSelectedPoint(point);
    }

    function handleUpdatePoint(point: PointEntity): void{
        setOpenEditionModal(true);
        setSelectedPoint(point);
    }

    function handleSeeMapOfPoint(point: PointEntity): void{

    }

    function handleCreatePoint(): void{
        setOpenEditionModal(true);
        setSelectedPoint(undefined);
    }

    function resetStates(): void{
        setOpenEditionModal(false);
        setOpenExclusionModal(false);
        setSelectedPoint(undefined);
    }

    React.useEffect(()=> {
        setBody(mockPoints.map(point => ({
            data: point,
            items: getItemsOfPoints(point)
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
                    justify="flex-end"
                    align="end"
                >
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="UF" 
                            width={150}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Cidade" 
                            minWidth={400}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Bairro" 
                            minWidth={400}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Rua" 
                            minWidth={400}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Numero" 
                            width={150}
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
                            padding={5}
                            onClick={handleCreatePoint}
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
            <PointEditionModal
                open={openEditionModal}
                selectedPoint={selectedPoint}
                onClose={resetStates}
            />
            <PointExclusionModal 
                open={openExclusionModal}
                selectedPoint={selectedPoint}
                onClose={resetStates}
            />
        </Stack>
    )
}

export default React.memo(PointsPage);