import { Center, Spinner } from "@chakra-ui/react";


export interface AppLoadingProps{
    open: boolean
}

export default function AppLoading({
    open
}: AppLoadingProps){
    return (
        open && (
            <Center
                width="100%"
                height="100%"
                background="rgba(0, 0, 0, 0.8)"
                position="absolute"
                top={0}
            >
                <Spinner
                    size="xl"
                    color="primary"
                    speed="0.5s"
                    thickness="5px"
                />
            </Center>
        )
    )
}