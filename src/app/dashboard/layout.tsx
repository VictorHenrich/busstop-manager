'use client'

import React from "react";
import { Center, Box, IconButton } from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import AppMenu, { AppMenuItemProps } from "@/components/menu";
import { DASHBOARD_MENU_ITENS } from "@/utils/constants";
import AppButton from "@/components/button";
import AppIconButton from "@/components/iconButton";



export default function DashboardLayout({ children }: React.PropsWithChildren): React.ReactElement{
    const [openMenu, setOpenMenu] = React.useState<boolean>(true);

    const [selectedItem, setSelectedItem] = React.useState<AppMenuItemProps>();

    return (
        <>
            <AppMenu 
                items={DASHBOARD_MENU_ITENS}
                selectedItem={selectedItem}
                onClose={() => setOpenMenu(false)}
                onSelectItem={(item) => setSelectedItem(item)}
                open={openMenu}
            />
            <Center
                width="full"
                height="full"
                backgroundColor="#4d4d4d"
                padding={10}
            >
                
                <Box
                    width="full"
                    height="full"
                    backgroundColor="secondary"
                    borderRadius={10}
                    position="relative"
                >
                    <AppIconButton
                        aria-label="menu"
                        width={50}
                        height={50}
                        borderRadius={10}
                        as={TiThMenu}
                        position="absolute"
                        top={10}
                        left={10}
                        onClick={()=> setOpenMenu(true)}
                    />
                    { children }
                </Box>
            </Center>
        </>
    );
}