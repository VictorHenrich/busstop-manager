import React from "react";
import styles from "@/styles/form.module.css";


export default function AppForm(props: Partial<React.FormHTMLAttributes<any>> = {}): React.ReactElement{
    return (
        <form
            className={styles.userForm}
            {...props}
        >

        </form>
    )
}