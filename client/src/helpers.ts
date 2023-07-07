import axios from 'axios'
import { SERVER_HOST, SERVER_PREFIX } from './contract'

interface RequestOptions<M extends keyof Queries = 'GET'> {
  method?: M;
  params?: Record<string, string>;
  body?: object;
}

type QueryResponse<
  U extends keyof Queries[M],
  M extends keyof Queries = 'GET'
> = 'response' extends keyof Queries[M][U] ? Queries[M][U]['response'] : never;

const injectParamsToUrl = (
    url: string,
    params?: Record<string, string>
): string => {
    if (params == null) {
        return url
    }
    let modifiedUrl = url
    for (const [key, value] of Object.entries(params)) {
        modifiedUrl = modifiedUrl.replace(`:${key}`, value)
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
        options.params
    )}`

    const { data } = ['POST', 'PUT'].includes(method)
        ? await axios({ url, method, data: body })
        : await axios({ url, method })
            
    return data
}
