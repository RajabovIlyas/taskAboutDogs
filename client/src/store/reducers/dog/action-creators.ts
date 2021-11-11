import {
    DogsActionEnum,
    IDogsState, Params, SetBreedsAction,
    SetDogsAction,
} from "./types";
import {AppDispatch} from "../../index";
import api from './api'
import {message} from "antd";
import {IBreed} from "../../../modals/breed.interface";

export const DogActionCreators = {
    setDogs: (data: IDogsState): SetDogsAction => ({type: DogsActionEnum.SET_DOGS, payload: data}),
    setBreeds: (data: IBreed[]): SetBreedsAction =>  ({type: DogsActionEnum.SET_BREEDS, payload: data}),
    getDogs: (params: Params) => async (dispatch: AppDispatch) => {
        api.getDogs(params).then(data => {
            dispatch(DogActionCreators.setDogs(data))
        }).catch(err => {
            message.warning('Ошибка при получении данных!')
        })
    },
    getBreeds: () => async (dispatch: AppDispatch) => {
        api.getBreeds().then(data => {
            dispatch(DogActionCreators.setBreeds(data))
        }).catch(err => {
            message.warning('Ошибка при получении данных пород!')
        })
    },
}
