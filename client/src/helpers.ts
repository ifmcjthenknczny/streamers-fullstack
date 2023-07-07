import axios from 'axios'
import { SERVER_HOST, SERVER_PREFIX } from './contract'

interface RequestOptions<M extends keyof Queries = 'GET'> {
  method?: M;
  params?: Record<string, string>;
  body?: object;
  queryParams?: Record<string, string | number>;
}

type QueryResponse<
  U extends keyof Queries[M],
  M extends keyof Queries = 'GET'
> = 'response' extends keyof Queries[M][U] ? Queries[M][U]['response'] : never;

const injectParamsToUrl = (
    url: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string | number>
): string => {
    let modifiedUrl = url
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            modifiedUrl = modifiedUrl.replace(`:${key}`, value)
        }
    }
    if (queryParams) {
        modifiedUrl = `${modifiedUrl}?`
        for (const [key, value] of Object.entries(queryParams)) {
            modifiedUrl = `${modifiedUrl}${key}=${value}`
        }
    }
    return modifiedUrl
}

export const query = async <
  U extends keyof Queries[M],
  M extends keyof Queries = 'GET'
>(
    relativeUrl: U,
    options: RequestOptions<M>
): Promise<QueryResponse<U, M>> => {
    const { method = 'GET', body } = options

    const url = `${SERVER_HOST}${SERVER_PREFIX}${injectParamsToUrl(
        String(relativeUrl),
        options.params,
        options.queryParams
    )}`

    const { data } = method === 'GET' ? await axios({ url, method }) :
        await axios({ url, method, data: body })
    return data
}
