

import * as type from './type';
const CHANGE_NAME  = "CHANGE_NAME";

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        name:name
    }
}
