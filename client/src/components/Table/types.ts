import React, {FC, ReactElement} from "react";

export interface IColumn {
    title: string,
    dataIndex: string[],
    key: string,
    render?: (src:string) => ReactElement<any, any> | null,
}

