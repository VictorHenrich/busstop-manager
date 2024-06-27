'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Text } from "@chakra-ui/react";
import AppModal, { AppModalProps } from "@/components/modal";
import AppInput from "@/components/input";
import AppForm from "@/components/form";
import { ActionProps, AgentEntity } from "@/utils/interfaces";
import { deleteAgent } from "./actions";



export interface AgentExclusionModalProps extends Omit<AppModalProps, "children">{
    selectedAgent?: Pick<AgentEntity, "uuid">
}


export default function AgentExclusionModal({
    selectedAgent,
    onClose,
    ...props
}: AgentExclusionModalProps){
    const [formState, formAction] = useFormState<ActionProps, FormData>(deleteAgent, { finish: false });

    const agent: Pick<AgentEntity, "uuid"> = React.useMemo(()=> {
        return selectedAgent || { uuid: "" }
    }, [selectedAgent]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    return (
        <AppModal
            onClose={onClose}
            title="Aviso"
            buttonsProps={{
                buttonConfirmProps: {
                    type: "submit",
                    backgroundColor: "red"
                }
            }}
            {...props}
        >
            <AppForm action={formAction}>
                <Text color="tertiary">Você tem deseja realizar a exclusão deste Agent?</Text>
                <AppInput 
                    type="hidden"
                    name="agentUuid"
                    value={agent.uuid}
                />
            </AppForm>
        </AppModal>
    )
}