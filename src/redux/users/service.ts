import {API_ENDPOINT} from "@state/CONSTANTS";

export default () => (
    fetch(`${API_ENDPOINT}/cache/creators`).then(async (res) =>
        res.ok ? await res.json() : Promise.reject(res)
    )
)