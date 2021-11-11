import {DogsAction, DogsActionEnum, IDogsState} from "./types";


const initialState: IDogsState = {
    data: [],
    breeds: [],
    total: 0,
}

export default function authReducer(state = initialState, action: DogsAction): IDogsState {
    switch (action.type) {
        case DogsActionEnum.SET_DOGS:
            return {...state, data: action.payload.data, total: action.payload.total}
        case DogsActionEnum.SET_BREEDS:
            return {...state, breeds: action.payload}
        default:
            return state;
    }
}
