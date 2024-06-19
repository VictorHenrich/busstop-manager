import React from "react";
import { 
    Input,
    Icon,
    InputGroup,
    FormControl,
    FormLabel,
    InputRightElement,
    FormControlProps,
    InputGroupProps,
    InputProps, 
    As
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
        <FormControl width="full" {...containerProps}>
            {label && (
                <FormLabel color="tertiary">
                    {label}
                </FormLabel>
            )}
            <InputGroup
                width="full"
            >
                <Input 
                    width="full"
                    colorScheme="primary"
                    borderColor="tertiary"
                    focusBorderColor="green.400"
                    _placeholder={{
                        color: "tertiary"
                    }}
                    color="tertiary"
                    size="lg"
                    opacity={0.7}
                    _focus={{
                        opacity: 1,
                        color: "primary",
                        _placeholder: { color: "primary"}
                    }}
                    {...props}
                />
                {icon && (
                        <InputRightElement 
                            color="primary"
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