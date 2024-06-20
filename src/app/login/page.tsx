'use client'

import React from "react";
import { useFormState } from 'react-dom'
import { Center, Stack } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import AppHeading from "@/components/heading";
import AppInput from "@/components/input";
import AppLink from "@/components/link";
import AppButton from "@/components/button";
import AppForm from "@/components/form";
import login from "./actions";
import AppAlert, { AppAlertProps } from "@/components/alert";
import { LoginActionResult, initialState } from "./states";


export default function LoginPage(){
    const [state, formAction, pending] = useFormState<LoginActionResult, FormData>(login, initialState);

    const [alertState, setAlertState] = React.useState<AppAlertProps>({
        open: false,
        message: "",
        status: "info"
    });

    React.useEffect(()=> {
        if(state.error)
            handleAlertState({ open: true, message: state.message, status: "error" })

    }, [state]);


    function handleAlertState(props: Partial<AppAlertProps>): void{
        setAlertState({ ...alertState, ...props });
    }

    return (
        <>
            <Stack
                width="100vw"
                height="100vh"
                direction="row"
                spacing={0}
            >
                <Center
                    width="40%"
                    height="full"
                    backgroundImage="url('/images/login_background.jpg')"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="100% 100%"
                    backgroundColor="red"
                    filter="brightness(50%)"
                    zIndex={10}
                >
                </Center>
                <Center 
                    backgroundColor="secondary"
                    width="60%"
                    height="full"
                >
                    <AppForm
                        action={formAction}
                    >
                        <Stack
                            direction="column"
                            align="center"
                            justify="center"
                            width="full"
                            height="full"
                            padding={20}
                            spacing={20}
                        >
                            <Stack 
                                width="full"
                                spacing={10}
                            >
                                <AppHeading
                                    fontSize={38}
                                >
                                    Seu caminho, nosso compromisso.
                                </AppHeading>
                                <AppHeading>
                                    Faça seu 
                                    <AppHeading 
                                        color="primary"
                                        display="inline"
                                    >
                                        {" "} login {" "}
                                    </AppHeading>
                                    agora mesmo!
                                </AppHeading>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={5}
                                width="full"
                            >
                                <AppInput
                                    name="email"
                                    placeholder="Digite seu email"
                                    type="email"
                                    icon={<MdEmail />}
                                />
                                <AppInput
                                    name="password"
                                    placeholder="Digite sua senha"
                                    type="password"
                                    icon={<RiLockPasswordFill />}
                                />
                                <AppLink>Esqueci minha senha</AppLink>
                            </Stack>
                            <AppButton
                                width="40%"
                                type="submit"
                            >
                                {!pending ? "Entrar" : "Acessando..."}
                            </AppButton>
                        </Stack>
                    </AppForm>
                </Center>
            </Stack>
            <AppAlert 
                {...alertState}
                onClose={()=> handleAlertState({ open: false, })}
            />
        </>
    )
}