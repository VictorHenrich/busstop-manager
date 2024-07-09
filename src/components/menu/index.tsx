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
    type As
} from "@chakra-ui/react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { APP_VERSION } from "@/utils/constants";


export interface AppMenuItemProps{
    id: string,
    description: string,
    icon: As,
    path?: string
}

export interface AppMenuProps{
    open: boolean,
    onClose: () => void,
    onSelectItem: (item: AppMenuItemProps) => void,
    items: AppMenuItemProps[],
    selectedItem?: AppMenuItemProps
}


export default function AppMenu({
    open,
    onClose,
    onSelectItem,
    items,
    selectedItem
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
                                    justifyContent="space-between"
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
                                    {item.description}
                                    <ListIcon
                                        marginLeft={5}
                                        as={item.icon}
                                        color="inherit"
                                        fontSize={25}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </DrawerBody>
                <DrawerFooter 
                    color="tertiary" 
                    background="black"
                    justifyContent="flex-start"
                >
                    {APP_VERSION}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}