import React from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";




export default function AppHeading(props: Partial<HeadingProps> = {}): React.ReactElement{
    return (
        <Heading 
            fontSize={30}
            color="tertiary"
            {...props}
        />
    )
}