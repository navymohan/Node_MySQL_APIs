import { combineReducers } from "redux";
import storeToken from "./storeToken";

const reducers = combineReducers({
    storeToken: storeToken
})

export default reducers;