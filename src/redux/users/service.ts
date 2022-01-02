import { API_ENDPOINT } from '@state/CONSTANTS'

export enum Endpoints {
  recent = '/cache/creator/recent',
}

export default async (path: Endpoints = Endpoints.recent): Promise<any> => (
  await fetch(`${API_ENDPOINT}${path}`).then(async (res) =>
    res.ok ? await res.json() : await Promise.reject(res)
  )
)
