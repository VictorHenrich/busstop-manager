import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { 
    Menu, 
    MenuList, 
    MenuItem, 
    MenuButton, 
    type MenuItemProps, 
    type MenuListProps, 
    type MenuButtonProps 
} from "@chakra-ui/react";


export type AppMenuListItemValue = string | number | React.ReactElement;

export interface AppMenuListItemProps extends MenuItemProps{
    id: string,
    description: string,
}

export interface AppMenuListProps extends MenuListProps{
    items: AppMenuListItemProps[],
    open?: boolean,
    onSelectItem?: (item: AppMenuListItemProps) => void,
    onClose?: () => void,
    buttonProps?: MenuButtonProps
}

export default function AppMenuList({
    items,
    open,
    onSelectItem = ()=> null,
    onClose = ()=> null,
    buttonProps = {}
}: AppMenuListProps): React.ReactElement{
    return (
        <Menu
            isOpen={open}
            onClose={onClose}
        >
                <MenuButton
                    color="tertiary"
                    fontSize={25}
                    _hover={{
                        color: "primary"
                    }}
                    {...buttonProps}
                >
                    <CiMenuKebab />
                </MenuButton>
            <MenuList
                backgroundColor="secondary"
                borderColor="black"
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={()=> onSelectItem(item)}
                        transition="all 0.5s"
                        backgroundColor="secondary"
                        color="tertiary"
                        fontSize={15}
                        {...item}
                        _hover={{
                            backgroundColor: "black"
                        }}
                    >
                        {item.description}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}