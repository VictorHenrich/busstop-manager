import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";




export default function AppButton(props: Partial<ButtonProps> = {}): React.ReactElement{
    return (
        <Button 
            color="secondary"
            backgroundColor="primary"
            width="auto"
            _hover={{
                backgroundColor: "tertiary"
            }}
            {...props}
        />
    )
}