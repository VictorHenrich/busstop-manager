'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import { PointEntity } from "@/utils/entities";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { mockPoints } from "./mock";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";


function PointsPage(): React.ReactElement{
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
                        {description: "Alterar", id: "update"},
                        {description: "Excluir", id: "delete"},
                    ]}
                />
            ),
            align: "center"
            }
        ]
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
                    justify="start" 
                    align="end"
                >
                    <WrapItem>
                        <AppInput type="text" label="UF" minWidth={150}/>
                    </WrapItem>
                    <WrapItem>
                        <AppInput type="text" label="Cidade" minWidth={400}/>
                    </WrapItem>
                    <WrapItem>
                        <AppInput type="text" label="Bairro" minWidth={400}/>
                    </WrapItem>
                    <WrapItem>
                        <AppInput type="text" label="Rua" minWidth={400}/>
                    </WrapItem>
                    <WrapItem>
                        <AppInput type="text" label="Numero" minWidth={150}/>
                    </WrapItem>
                    <WrapItem>
                        <AppButton  
                            minWidth={100}
                            rightIcon={<FaSearch />}
                        >
                            Pesquisar
                        </AppButton>
                    </WrapItem>
                    <WrapItem>
                        <AppButton 
                            minWidth={100}
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
        </Stack>
    )
}

export default React.memo(PointsPage);