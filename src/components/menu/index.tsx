'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { 
    List, 
    ListIcon, 
    ListItem,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    type As,
    Box,
    Stack,
    Icon
} from "@chakra-ui/react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { APP_VERSION } from "@/utils/constants";


export interface AppMenuItemProps{
    id: string,
    description: string,
    icon: As,
    path?: string
}

export interface AppMenuFooterItemProps extends AppMenuItemProps{
    children?: React.ReactElement | string | number
}

export interface AppMenuProps{
    open: boolean,
    onClose: () => void,
    onSelectItem: (item: AppMenuItemProps) => void,
    items: AppMenuItemProps[],
    footerItems?: AppMenuFooterItemProps[],
    selectedItem?: AppMenuItemProps
}


export default function AppMenu({
    open,
    onClose,
    onSelectItem,
    items,
    selectedItem,
    footerItems = []
}: AppMenuProps): React.ReactElement{
    const router: AppRouterInstance = useRouter();

    const hoverStyle: React.CSSProperties = {
        backgroundColor: "var(--color-primary)",
        color: "var(--color-secondary)"
    }

    function handleClickItem(item: AppMenuItemProps): void{
        if(item.path)
            router.replace(item.path)

        onSelectItem(item);
    }

    return (
        <Drawer 
            isOpen={open}
            onClose={onClose}
            placement="left"
        >
            <DrawerOverlay />
            <DrawerContent
                minWidth={250}
                height="100vh"
                backgroundColor="secondary"
                color="primary"
                zIndex={1000}
            >
                <DrawerCloseButton />
                <DrawerHeader color="tertiary" backgroundColor="black">
                    Menu
                </DrawerHeader>
                <DrawerBody width="full">
                    <List width="full">
                        {items.map((item, index) => {
                            const selected: boolean = selectedItem?.id === item.id;

                            return (
                                <ListItem
                                    key={index}
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    width="full"
                                    padding={5}
                                    cursor="pointer"
                                    transition="all 0.5s"
                                    fontWeight={500}
                                    fontSize={15}
                                    _hover={hoverStyle}
                                    style={selected ? hoverStyle : undefined}
                                    onClick={()=> handleClickItem(item)}
                                >
                                    
                                    <ListIcon
                                        as={item.icon}
                                        color="inherit"
                                        fontSize={25}
                                        marginRight={5}
                                    />
                                    {item.description}
                                </ListItem>
                            )
                        })}
                    </List>
                </DrawerBody>
                <DrawerFooter
                    borderTopWidth={1}
                    borderTopColor="black"
                >
                    <List width="full">
                        {footerItems.map((item, index) => {
                            return (
                                item.children 
                                    ? item.children
                                    : (
                                        <ListItem
                                            key={index}
                                            display="flex"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            width="full"
                                            padding={5}
                                            cursor="pointer"
                                            transition="all 0.5s"
                                            fontWeight={500}
                                            fontSize={15}
                                            _hover={hoverStyle}
                                            onClick={()=> handleClickItem(item)}
                                        >
                                            
                                            <ListIcon
                                                as={item.icon}
                                                color="inherit"
                                                fontSize={25}
                                                marginRight={5}
                                            />
                                            {item.description}
                                        </ListItem>
                                    )
                            )
                        })}
                    </List>
                </DrawerFooter>
                <Box
                    width="full"
                    height={10}
                    padding={2}
                    color="tertiary" 
                    background="black"
                    justifyContent="flex-start"
                >
                    {APP_VERSION}
                </Box>
            </DrawerContent>
        </Drawer>
    )
}