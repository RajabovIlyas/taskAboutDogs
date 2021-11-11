import {IBreed} from './breed.interface'

export interface IDog{
    _id: string;
    breed: IBreed;
    image: string;
    title: string;
    [key: string]: string | IBreed;
}
