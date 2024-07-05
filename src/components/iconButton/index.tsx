import React from "react";
import { IconButton, type IconButtonProps } from "@chakra-ui/react";


export default function AppIconButton(props: IconButtonProps): React.ReactElement{
    return (
        <IconButton
            cursor="pointer"
            backgroundColor="primary"
            color="secondary"
            padding={2}
            boxShadow="0px 2px 1px black"
            _hover={{
                backgroundColor: "tertiary",
                color: "primary"
            }}
            {...props}
        />
    );
}