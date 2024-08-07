'use client'

import React from "react";
import { Center, Stack, Image } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

import AppHeading from "@/components/heading";
import AppInput from "@/components/input";
import AppLink from "@/components/link";
import AppButton from "@/components/button";
import AppForm from "@/components/form";
import login from "./actions";
import AppAlert, { type AppAlertProps } from "@/components/alert";
import { type ActionProps } from "@/utils/interfaces";
import AppLoading from "@/components/loading";



function LoginPage(): React.ReactElement{
    const [state, formAction] = useFormState<ActionProps, FormData>(login, { finish: false });

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [alertState, setAlertState] = React.useState<AppAlertProps>({
        open: false,
        message: "",
        status: "info"
    });

    const handleAlertState = React.useCallback((props: Partial<AppAlertProps>)=> {
        setAlertState({ ...alertState, ...props });
    }, [alertState]);

    React.useEffect(()=> {
        if(!state.finish) return

        setOpenLoading(false);
        
        if(state.errorMessage)
            handleAlertState({ open: true, message: state.errorMessage, status: "error" });

        else
            redirect("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    

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
                    backgroundSize="auto 100%"
                    zIndex={10}
                >
                </Center>
                <Center 
                    backgroundColor="secondary"
                    width="60%"
                    padding={20}
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
                            spacing={20}
                            boxSizing="border-box"
                        >
                            <Stack 
                                width="full"
                                spacing={10}
                                align="center"
                            >
                                <Image 
                                    src="./images/busstop_soon.png"
                                    alt="Logo"
                                    width={200}
                                    height="auto"
                                />
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
                                onClick={()=> setOpenLoading(true)}
                            >
                                Entrar
                            </AppButton>
                        </Stack>
                    </AppForm>
                </Center>
            </Stack>
            <AppAlert 
                {...alertState}
                onClose={()=> handleAlertState({ open: false, })}
            />

            <AppLoading 
                open={openLoading}
            />
        </>
    )
}

export default React.memo(LoginPage);