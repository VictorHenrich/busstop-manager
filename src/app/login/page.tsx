import { Center, Stack, CheckboxIcon } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import AppHeading from "@/components/heading";
import AppInput from "@/components/input";
import AppLink from "@/components/link";
import AppButton from "@/components/button";


export default function LoginPage(){
    return (
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
                            placeholder="Digite seu email"
                            type="email"
                            icon={<MdEmail />}
                        />
                        <AppInput 
                            placeholder="Digite sua senha"
                            type="password"
                            icon={<RiLockPasswordFill />}
                        />
                        <AppLink>Esqueci minha senha</AppLink>
                    </Stack>
                    <AppButton
                        width="40%"    
                    >
                            Entrar
                    </AppButton>
                </Stack>
            </Center>
        </Stack>
    )
}