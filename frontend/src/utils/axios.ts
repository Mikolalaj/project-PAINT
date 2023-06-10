import { AxiosError, AxiosResponse } from 'axios'

interface ErrorResponse {
    message: string
    data?: any
}

export function parseError(error: AxiosError): ErrorResponse {
    if (error.response) {
        if ('message' in (error.response?.data as ErrorResponse)) {
            return error.response.data as ErrorResponse
        }
    }
    return {
        message: `Something went wrong... ${error.message}`,
        data: null,
    }
}

export function parseErrorMessage(error: AxiosError): string {
    return parseError(error).message
}

export function parseResponse<T>(response: AxiosResponse<T>) {
    return response.data
}
