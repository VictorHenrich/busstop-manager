'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import { AgentEntity } from "@/utils/entities";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";
import { mockAgents } from "./mock";



function AgentsPage(): React.ReactElement{
    const [body, setBody] = React.useState<AppTableBodyItemProps<AgentEntity>[]>([]);

    const header: AppTableItemProps[] = [
        {
            value: "Nome",
        },
        {
            value: "Email"
        },
        {
            value: "Ação"
        }
    ]

    function getItemsOfRoute(agent: AgentEntity): AppTableItemProps[]{
        return [
            { value: agent.name },
            { value: agent.email },
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
        setBody(mockAgents.map(agent => ({
            data: agent,
            items: getItemsOfRoute(agent)
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
                            label="Nome" 
                            minWidth={500}
                        />
                    </WrapItem>
                    <WrapItem>
                        <AppInput 
                            type="text" 
                            label="Email" 
                            minWidth={500}
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


export default React.memo(AgentsPage);