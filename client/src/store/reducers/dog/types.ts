import {IDog} from "../../../modals/dog.interface";
import {IBreed} from "../../../modals/breed.interface";

export interface IDogsState {
    data: IDog[];
    total: number;
    breeds?: IBreed[]
}

export type Params = {
    page?: number,
    limit?: number,
    searchTitle?: string,
    breedFilter?: string
}

export enum DogsActionEnum {
    SET_DOGS = "SET_DOGS",
    SET_BREEDS = "SET_BREEDS"
}

export interface SetDogsAction {
    type: DogsActionEnum.SET_DOGS;
    payload: IDogsState;
}

export interface SetBreedsAction {
    type: DogsActionEnum.SET_BREEDS;
    payload: IBreed[];
}


export type DogsAction =
    SetDogsAction |
    SetBreedsAction
