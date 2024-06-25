import React from "react";


export default function AppForm(props: Partial<React.FormHTMLAttributes<any>> = {}): React.ReactElement{
    return (
        <form
            style={{
                width: "100%"
            }}
            {...props}
        >

        </form>
    )
}