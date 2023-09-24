import { baseURL } from "./request"

const toServerURL = (localtion) => {
    let serverURL;

    if (localtion === '') return '';

    if (localtion.startsWith('http'))
        serverURL = localtion
    else serverURL = baseURL + '/upload/' + localtion

    return serverURL
}

export default toServerURL