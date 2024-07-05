'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import type{ RouteEntity } from "@/utils/interfaces";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";
import { mockRoutes } from "./mock";
import FormatterUtils from "@/utils/formatter";



function RoutesPage(): React.ReactElement{
    const [body, setBody] = React.useState<AppTableBodyItemProps<RouteEntity>[]>([]);

    const header: AppTableItemProps[] = [
        {
            value: "Descrição",
        },
        {
            value: "Horário de inicialização"
        },
        {
            value: "Horário de finalização"
        },
        {
            value: "Valor da Passagem"
        },
        {
            value: "Ação"
        }
    ]

    function getItemsOfRoute(route: RouteEntity): AppTableItemProps[]{
        return [
            { value: route.description },
            { value: FormatterUtils.formatHoursToBR(route.openingTime) },
            { value: FormatterUtils.formatHoursToBR(route.closingTime) },
            { value: route.ticketPrice },
            { value: (
                <AppMenuList 
                    items={[
                        {description: "Visualizar Trajeto", id: "see"},
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
        setBody(mockRoutes.map(route => ({
            data: route,
            items: getItemsOfRoute(route)
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
                            label="Descrição" 
                            minWidth={500}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="time" 
                            label="Horario início" 
                            width={150}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput  
                            type="time" 
                            label="Horário término" 
                            width={150}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="number" 
                            label="Valor da passagem" 
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

export default React.memo(RoutesPage);