import {DATA} from './action';

const initState = {
    data: []
}

export const reducer = (store = initState, {type,payload}) =>{
    switch (type) {
        case DATA:
            return {...store, data: payload};
        default:
            return store;
    }
}