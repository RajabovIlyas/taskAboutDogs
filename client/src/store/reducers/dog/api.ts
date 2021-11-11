import apiFetch from '../../../utils/apiFetch';
import {Params} from "./types";

const api = '/dog'

export default {
    getDogs: (params:Params) => apiFetch(`${api}`, { method: 'get', params }),
    getBreeds: () => apiFetch('/breed', {method: 'get'}),
}
