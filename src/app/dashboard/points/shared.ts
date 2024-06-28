import { AppTableItemProps } from "@/components/table";
import { PointEntity } from "@/utils/interfaces";

export const pointsTableHeader: AppTableItemProps[] = [
    {
        value: "Estado (UF)",
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
        value: "Coordenadas",
        align: "center"
    }
];


export function getItemsOfPoints(point: PointEntity): AppTableItemProps[]{
    return [
        { value: point.addressState },
        { value: point.addressCity },
        { value: point.addressNeighborhood },
        { value: point.addressStreet },
        { value: point.addressNumber },
        { value: `(${point.latitude}, ${point.longitude})`, align: "center"}
    ]
}