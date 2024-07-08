import React from "react";
import { 
    Input,
    InputGroup,
    FormControl,
    FormLabel,
    InputRightElement,
    type FormControlProps,
    type InputProps,
} from "@chakra-ui/react";


export interface AppInputProps extends InputProps{
    containerProps?: Partial<FormControlProps>,
    icon?: React.ReactElement,
    label?: string
}


export default function AppInput({
    containerProps = {},
    icon,
    label,
    ...props
}: AppInputProps = {}): React.ReactElement{
    return (
        <FormControl 
            width="full"
            colorScheme="primary"
            borderColor="tertiary"
            color="tertiary"
            _focus={{
                color: "primary",
                _placeholder: { color: "primary"}
            }}
            {...containerProps}
            
        >
            {label && (
                <FormLabel color="tertiary">
                    {label}
                </FormLabel>
            )}
            <InputGroup
                width="full"
            >
                <Input
                    opacity={0.7}
                    size="lg"
                    _placeholder={{
                        color: "tertiary"
                    }}
                    _autofill={{ color: "primary"}}
                    _focus={{
                        backgroundColor: "black",
                        opacity: 1,
                        _placeholder: { color: "inherit"}
                    }}
                    colorScheme="primary"
                    focusBorderColor="green.400"
                    {...props}
                />
                {icon && (
                        <InputRightElement 
                            color="inherit"
                            fontSize={30}
                        >
                            {icon}
                        </InputRightElement>
                    )
                }
            </InputGroup>
        </FormControl>
    )
}