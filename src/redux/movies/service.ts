import { API_ENDPOINT } from '@state/CONSTANTS'

export enum Endpoints {
  recent = '/movie/recent',
  profile = '/movie/profile'
}

export default async (path: Endpoints = Endpoints.recent, args?: any): Promise<any> => {
  const params = args !== undefined ? `?${new URLSearchParams(args).toString()}` : ''
  return await fetch(`${API_ENDPOINT}${path}${params}`).then(async (res) =>
    res.ok ? await res.json() : await Promise.reject(res)
  )
}
