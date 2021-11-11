import React, {FC} from 'react';
import styles from './Table.module.css'
import {IColumn} from "./types";
import {IDog} from "../../modals/dog.interface";

interface ITableProps {
    columns: IColumn[];
    dataSource: IDog[]
}

const Table: FC<ITableProps> = ({columns, dataSource}) => {

    const reduceGetElement = (previousValue: any, currentValue: string) => previousValue[currentValue];
    const renderFunc = (column: IColumn, data: IDog) => {
        const result = column.dataIndex.reduce(reduceGetElement, data);
        return column.render ? column.render(result) : result;
    }
    return (
        <table className={styles.table}>
            <tbody>
            <tr className={styles.table_header}>
                {columns.map(column => (<th className={styles.header__item} key={column.key}>{column.title}</th>))}
            </tr>
            {dataSource.map((value, index) => (
                <tr key={index} className={styles.table_row}>
                    {columns.map(column => (
                        <td className={styles.table_data} key={column.key + index}>{renderFunc(column, value)}</td>))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
