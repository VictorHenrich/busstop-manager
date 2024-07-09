'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { Center, Box } from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import AppMenu, { type AppMenuItemProps } from "@/components/menu";
import { DASHBOARD_MENU_ITENS, DASHBOARD_FOOTER_MENU_ITENS } from "@/utils/constants";
import AppIconButton from "@/components/iconButton";



export default function DashboardLayout({ children }: React.PropsWithChildren): React.ReactElement{
    const currentPath: string = usePathname();

    const [openMenu, setOpenMenu] = React.useState<boolean>(true);

    const [selectedItem, setSelectedItem] = React.useState<AppMenuItemProps>();

    React.useEffect(()=> {
        const locatedItem = DASHBOARD_MENU_ITENS.find(item => item.path === currentPath);

        if(locatedItem)
            setSelectedItem(locatedItem);
    }, [ currentPath ]);

    return (
        <>
            <AppMenu 
                items={DASHBOARD_MENU_ITENS}
                footerItems={DASHBOARD_FOOTER_MENU_ITENS}
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
                    padding={10}
                    backgroundColor="secondary"
                    borderRadius={10}
                    overflowY="auto"
                >
                    <Box width="full" marginBottom={10}>
                        <AppIconButton
                            aria-label="menu"
                            width={50}
                            height={50}
                            borderRadius={10}
                            as={TiThMenu}
                            onClick={()=> setOpenMenu(true)}
                        />
                    </Box>
                    { children }
                </Box>
            </Center>
        </>
    );
}