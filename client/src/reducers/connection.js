import { ConnectionType } from "../actions/actionTypes";

export default function (state = [], action) {

    switch (action.type) {
        case ConnectionType:
            return [action.payload.data, ...state];
    }
    return state;
}
