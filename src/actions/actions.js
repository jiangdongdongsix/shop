

import * as type from './type';

export function changeName(name) {
    return {
        type: type.CHANGE_NAME,
        name:name
    }
}
