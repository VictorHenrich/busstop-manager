'use client'

import React from "react";
import AppTable, { AppTableBodyItemProps, AppTableItemProps } from "@/components/table";
import { PointEntity } from "@/utils/entities";
import { Center } from "@chakra-ui/react";
import { mockPoints } from "./mock";
import AppMenuList from "@/components/menuList";


function PointsPage(): React.ReactElement{
    const [body, setBody] = React.useState<AppTableBodyItemProps<PointEntity>[]>([]);

    const header: AppTableItemProps[] = [
        {
            value: "Estado (UF)"
        },
        {
            value: "Cidade"
        },
        {
            value: "Bairro"
        },
        {
            value: "Rua"
        },
        {
            value: "Numero"
        },
        {
            value: "Coordenadas"
        },
        {
            value: "Ações"
        }
    ]

    function getItemsOfPoints(point: PointEntity): AppTableItemProps[]{
        return [
            { value: point.addressState },
            { value: point.addressCity },
            { value: point.addressNeighborhood },
            { value: point.addressStreet },
            { value: point.addressNumber },
            { value: `(${point.latitude}, ${point.longitude})`},
            { value: (
                <AppMenuList 
                    items={[
                        {description: "Alterar", id: "update"},
                        {description: "Excluir", id: "delete"},
                    ]}
                />
            )}
        ]
    }

    React.useEffect(()=> {
        setBody(mockPoints.map(point => ({
            data: point,
            items: getItemsOfPoints(point)
        })))
    }, []);

    return (
        <Center
            width="full"
            height="full"
        >
            <AppTable
                header={header}
                body={body}
            />
        </Center>
    )
}

export default React.memo(PointsPage);