import { API_ENDPOINT } from '@state/CONSTANTS'

export default async (): Promise<any> => (
  await fetch(`${API_ENDPOINT}/cache/creators`).then(async (res) =>
    res.ok ? await res.json() : await Promise.reject(res)
  )
)
