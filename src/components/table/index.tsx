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
    type TableCellProps,
    type TableRowProps
} from '@chakra-ui/react'


export type AppTableItemValue = string | number | React.ReactElement;


export interface AppTableItemProps extends Partial<TableCellProps>{
    value: AppTableItemValue
}

export interface AppTableBodyItemProps<T> extends Partial<TableRowProps>{
    items: AppTableItemProps[],
    data: T
}

export interface AppTableProps<T>{
    header: AppTableItemProps[],
    body: AppTableBodyItemProps<T>[],
    footer?: AppTableItemProps[],
    description?: string,
    selectedItem?: AppTableBodyItemProps<T>,
    onSelectItem?: (item: AppTableBodyItemProps<T>) => void,
    isSelectable?: boolean
}

const selectedItemStyle: React.CSSProperties = {
    background: "white",
    color: "black",
    cursor: "pointer"
}

export default function AppTable<T>({
    header,
    body,
    description,
    selectedItem,
    onSelectItem = ()=> null,
    footer = [],
    isSelectable = false
}: AppTableProps<T>): React.ReactElement{

    const hoverStyle: React.CSSProperties = React.useMemo<React.CSSProperties>(()=> {
        return isSelectable ? selectedItemStyle : {}
    }, [isSelectable]);

    const getSelectedItem = React.useCallback((row: AppTableBodyItemProps<T>)=> {
        return selectedItem && selectedItem.id === row.id
            ? selectedItemStyle : undefined
    }, [selectedItem]);

    return (
        <TableContainer>
            <Table variant="unstyled">
                {description && (
                    <TableCaption>{description}</TableCaption>
                )}
                <Thead>
                    <Tr>
                        {header.map((item, index) => (
                            <Th
                                key={index}
                                align="left"
                                {...item}
                            >
                                {item.value}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {body.map((row, rowIndex) => {
                        const selectedStyle: React.CSSProperties | undefined = getSelectedItem(row);

                        return (
                            <Tr
                                transition="all .5s"
                                key={rowIndex}
                                onClick={()=> onSelectItem(row)}
                                color="tertiary"
                                _hover={hoverStyle}
                                style={selectedStyle}
                                {...row}
                            >
                                {row.items.map((item, itemIndex) => (
                                <Td
                                        key={itemIndex}
                                        align="left"
                                        color="inherit"
                                        {...item}
                                >
                                        {item.value}
                                </Td> 
                                ))}
                            </Tr>
                        )
                    })}
                </Tbody>
                <Tfoot>
                    <Tr>
                        {footer.map((item, index) => (
                            <Td
                                key={index}
                                align="left"
                                {...item}
                            >
                                {item.value}
                            </Td>
                        ))}
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}