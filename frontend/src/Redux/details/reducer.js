import {DETAILS} from "./action";

const initState = {
    data: {},
}

export const detailsReducer = (store = initState, { type, payload }) => {
//   console.log(store);
  switch (type) {
    case DETAILS:
      return { ...store, data: payload };
    default:
      return store;
  }
};