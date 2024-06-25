'use client'

import React from "react";
import { redirect, usePathname } from "next/navigation";



export default function DashboardPage(): React.ReactElement{
    const pathname: string = usePathname();

    React.useEffect(()=> {
        if(pathname == "/dashboard")
            redirect("/dashboard/points");
    }, [pathname]);

    return <></>
}