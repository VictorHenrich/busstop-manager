import React from "react";
import { Link, LinkProps } from "@chakra-ui/react";


export default function AppLink(props: Partial<LinkProps> = {}): React.ReactElement{
    return (
        <Link 
            fontSize={18}
            color="primary"
            textAlign="right"
            {...props}
        />
    )
}