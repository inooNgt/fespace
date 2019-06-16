import { createStore, combineReducers } from "redux";

import navReducer from "./reducers/index";

const reducers = combineReducers({
    navReducer
});

// 创建 Redux 的 store 对象
const store = createStore(reducers);

export default store;
