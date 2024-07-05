
import React from "react";
import { useFormState } from "react-dom";
import { Stack } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import type { ActionProps, AgentEntity } from "@/utils/interfaces";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import { createOrUpdateAgent } from "./actions";

export interface AgentEditionModalProps extends Omit<AppModalProps, "children">{
    selectedAgent?: AgentEntity
}

const agentDefault: AgentEntity = {
    email: "",
    name: "",
}

export function AgentEditionModal({
    selectedAgent,
    onClose,
    ...props
}: AgentEditionModalProps): React.ReactElement{
    const [formState, formAction] = useFormState<ActionProps, FormData>(createOrUpdateAgent, { finish: false });

    const [agentState, setAgentState] = React.useState<AgentEntity>(agentDefault);

    const buttonConfirmDescription: string = React.useMemo<string>(()=> {
        return agentState.uuid ? "Alterar" : "Cadastrar";
    }, [agentState])

    React.useEffect(()=> {

        setAgentState(selectedAgent || agentDefault);
    }, [selectedAgent]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    return (
        <AppModal
            onClose={onClose}
            buttonsProps={{
                buttonConfirmDescription,
                buttonConfirmProps: {
                    type: "submit"
                }
            }}
            {...props}
        >
            <AppForm action={formAction}>
                <Stack
                    width="full"
                    spacing={5}
                >
                    <AppInput 
                        type="text"
                        label="Nome"
                        name="name"
                        variant="filled"
                        color="secondary"
                        value={agentState.name}
                    />
                    <AppInput 
                        type="email"
                        label="Email"
                        name="email"
                        variant="filled"
                        color="secondary"
                        value={agentState.email}                            
                    />
                    <AppInput 
                        type="password"
                        label="Senha"
                        name="password"
                        variant="filled"
                        color="secondary"
                        value={agentState.password}                            
                    />
                    <AppInput 
                        type="hidden"
                        name="agentUuid"
                        variant="filled"
                        color="secondary"
                        value={agentState.uuid} 
                    />
                </Stack>
            </AppForm>
        </AppModal>
    )
}