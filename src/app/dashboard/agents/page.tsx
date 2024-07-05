'use client'

import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AppTable, { type AppTableBodyItemProps, type AppTableItemProps } from "@/components/table";
import type { AgentEntity } from "@/utils/interfaces";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import AppMenuList from "@/components/menuList";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import AppButton from "@/components/button";
import { mockAgents } from "./mock";
import { AgentEditionModal } from "./editionModal";
import AgentExclusionModal from "./exclusionModal";



function AgentsPage(): React.ReactElement{
    const [openEditionModal, setOpenEditionModal] = React.useState<boolean>(false);

    const [openExclusionModal, setOpenExclusionModal] = React.useState<boolean>(false);

    const [selectedAgent, setSelectedAgent] = React.useState<AgentEntity>();

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

    const getItemsOfRoute = React.useCallback<(agent: AgentEntity) => AppTableItemProps[]>((agent)=> {
        return [
            { value: agent.name },
            { value: agent.email },
            { value: (
                <AppMenuList 
                    items={[
                        {
                            description: "Alterar", 
                            id: "update",
                            onClick: ()=> handleClickUpdate(agent)
                        },
                        {
                            description: "Excluir", 
                            id: "delete",
                            onClick: ()=> handleClickDelete(agent)
                        },
                    ]}
                />
            ),
            align: "center"
            }
        ]
    }, []);


    React.useEffect(()=> {
        setBody(mockAgents.map(agent => ({
            data: agent,
            items: getItemsOfRoute(agent)
        })))
    }, [getItemsOfRoute]);

    function handleClickCreate(): void{
        setOpenEditionModal(true);
        setSelectedAgent(undefined);
    }

    function handleClickUpdate(agent: AgentEntity): void{
        setOpenEditionModal(true);
        setSelectedAgent(agent);
    }

    function handleClickDelete(agent: AgentEntity): void{
        setOpenExclusionModal(true);
        setSelectedAgent(agent);
    }

    function reset(): void{
        setOpenEditionModal(false);
        setOpenExclusionModal(false);
        setSelectedAgent(undefined);
    }

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
                            onClick={handleClickCreate}
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
            <AgentEditionModal 
                onClose={reset}
                open={openEditionModal}
                selectedAgent={selectedAgent}
            />
            <AgentExclusionModal
                onClose={reset}
                open={openExclusionModal}
                selectedAgent={selectedAgent}
            />
        </Stack>
    )
}


export default React.memo(AgentsPage);