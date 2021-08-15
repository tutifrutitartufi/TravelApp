import { combineReducers } from "redux";
import ConnectionReducer from "./connection";

const RootReducer = combineReducers({
    Connection: ConnectionReducer
});
export default RootReducer;
