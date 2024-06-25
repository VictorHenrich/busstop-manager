'use client'

import React from "react";
import { usePathname, redirect } from "next/navigation";



export default function HomePage(): React.ReactElement {
  const pathname: string = usePathname();

  React.useEffect(()=>{
    if(pathname == "/")
      redirect("/login");

  }, [pathname]);

  return <></>;
}
