import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input, Layout, Pagination, Select, Table} from "antd";
import MyTable from '../components/Table/Table'
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import styles from './Home.module.css'
import {columns} from "./columns";
import {Params} from "../store/reducers/dog/types";

const {Option} = Select;

const Home: FC = () => {
    const {getDogs, getBreeds} = useActions();
    const [params, setParams] = useState<Params>({
         page: 1, limit: 10,
    })
    const {data, total, breeds } = useTypedSelector(state => state.dog);
    useEffect(()=>{
        getDogs(params)
    }, [params])
    useEffect(()=> {
        getBreeds();
    },[])

    const onChange = (page: number, limit: number|undefined) => {
        setParams({...params, page, limit });
    };
    const handleBreedFilter = (breedFilter:string) => {
        setParams({...params, breedFilter})
    }
    const handleSearchTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setParams({...params, searchTitle: e.target.value})
    }
    return (
        <div className={styles.home}>
            <div className={styles.pagination}>
            <Pagination showSizeChanger  onChange={onChange}
                        defaultPageSize={params.limit} total={total} defaultCurrent={params.page}/>
            </div>
            <div className={styles.filter_form}>
                <Input style={{ width: 200 }} placeholder={'Поиск по заголовке'}
                       value={params.searchTitle} onChange={handleSearchTitle}/>
                <Select style={{ width: 200 }} placeholder={'Фильтрация по породе'}
                        onChange={handleBreedFilter} allowClear>
                    {Array.isArray(breeds)?
                        breeds.map((value,index)=>
                            (<Option key={index} value={value._id}>{value.title}</Option>)):null}
                </Select>
            </div>
            <MyTable dataSource={data} columns={columns}/>
        </div>
    )
};

export default Home;
