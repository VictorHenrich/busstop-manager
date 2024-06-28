import React from "react";
import { 
    FormControl, 
    FormLabel, 
    Select,
    Center,
    Text,
    SelectProps,
    FormControlProps
} from "@chakra-ui/react";


export interface AppSelectItemProps extends Omit<React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>, "children">{
    description: number | string
}

export interface AppSelectProps extends SelectProps{
    items: AppSelectItemProps[],
    containerProps?: Partial<FormControlProps>,
    label?: string
}


export default function AppSelect({
    containerProps,
    label,
    items,
    ...props
}: AppSelectProps): React.ReactElement{
    return (
        <FormControl width="full" {...containerProps}>
            {label && (
                <FormLabel color="tertiary">
                    {label}
                </FormLabel>
            )}
            <Select
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
            >
                {...items.map((item, index) => (
                    <option
                        key={index}
                        {...item}
                    >
                        <Text>{item.description}</Text>
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}