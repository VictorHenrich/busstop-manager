import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    TableCellProps,
    TableRowProps
} from '@chakra-ui/react'


export type AppTableItemValue = string | number | React.ReactElement;


export interface AppTableItemProps extends TableCellProps{
    value: AppTableItemValue
}

export interface AppTableBodyItemProps<T> extends TableRowProps{
    items: AppTableItemProps[],
    data: T
}

export interface AppTableProps<T>{
    header: AppTableItemProps[],
    body: AppTableBodyItemProps<T>[],
    footer?: AppTableItemProps[],
    description?: string
}

export default function AppTable<T>({
    header,
    body,
    footer = [],
    description
}: AppTableProps<T>): React.ReactElement{
    return (
        <Table 
            variant="striped" 
            colorScheme="primary"
            width="full"
            height="full"
        >
            <TableContainer
                width="full"
                height="full"
            >
                {description && (
                    <TableCaption>{description}</TableCaption>
                )}
                <Thead>
                    <Tr>
                        {header.map((item, index) => (
                            <Th
                                key={index}
                                {...item}
                            >
                                {item.value}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {body.map((row, rowIndex) => (
                        <Tr
                            key={rowIndex}
                            {...row}
                        >
                            {row.items.map((item, itemIndex) => (
                               <Td
                                    key={itemIndex}
                                    {...item}
                               >
                                    {item.value}
                               </Td> 
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        {footer.map((item, index) => (
                            <Td
                                key={index}
                                {...item}
                            >
                                {item.value}
                            </Td>
                        ))}
                    </Tr>
                </Tfoot>
            </TableContainer>
        </Table>
    )
}