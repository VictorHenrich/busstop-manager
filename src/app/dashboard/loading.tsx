import React from "react"
import AppLoading from "@/components/loading"


function DashboardLoadingPage(): React.ReactElement{
    return (
        <AppLoading open={true}/>
    )
}

export default React.memo(DashboardLoadingPage)