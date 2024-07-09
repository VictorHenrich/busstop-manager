import { Alert, AlertIcon, Slide, type AlertProps } from "@chakra-ui/react";
import React from "react";



export interface AppAlertProps extends AlertProps{
    message: string,
    open: boolean,
    seconds?: number,
    onClose?: () => void,
}

export default function AppAlert({
    message,
    open,
    seconds = 3,
    onClose = () => null,
    ...props
}: AppAlertProps): React.ReactElement{

    React.useEffect(()=> {
        if(open)
            setTimeout(onClose, (seconds * 1000));
    }, [open, onClose, seconds]);

    return (
        <Slide
            style={{ width: "100%", background: "red", zIndex: 1000 }}
            direction="top" 
            in={open}
        >
            <Alert
                width="100%"
                fontSize={20}
                fontWeight={600}
                {...props}
            >
                { message }
                <AlertIcon marginLeft={5}/>
            </Alert>
        </Slide>
    )
}