import axios from "axios";
import {API_ENDPOINT} from "@state/CONSTANTS";

export const request = async (path: string, args?: object): Promise<any> => {
    const res = await axios.request( {
        url: path,
        baseURL: API_ENDPOINT,
        ...args
    })

    return res.statusText === 'OK'
        ? await res.data
        : await Promise.reject(res)

}
