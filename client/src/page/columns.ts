import React, {FC} from 'react'
import {IColumn} from "../components/Table/types";
import Image from '../components/Image'



export const columns: IColumn[] = [
    {
        title: 'Заголовок',
        dataIndex: ['title'],
        key: 'title',
    },
    {
        title: 'Картинка',
        dataIndex: ['image'],
        key: 'image',
        render: Image,
    },
    {
        title: 'Порода',
        dataIndex: ['breed','title'],
        key: 'breed.title',
    },
];
