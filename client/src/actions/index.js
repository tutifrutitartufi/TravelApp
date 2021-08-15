import axios from "axios";
import { ConnectionType } from "./actionTypes";

export function GetConnection(from, to) {
    let Url = `${process.env.REACT_APP_API_URL}/connections`;
    if (from && to) {
        Url += `?from=${from}&to=${to}`;
    }
    const Request = axios.get(Url).catch(err => console.log(err));
    return {
        type: ConnectionType,
        payload: Request
    };
}
