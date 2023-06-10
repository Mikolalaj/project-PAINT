import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../atoms'
import { parseErrorMessage, parseResponse } from '../utils/axios'

type ResetPasswordRequest = {
    password: string
    token: string
    email: string
}

export function useAccount() {
    const setLoginResponse = useSetRecoilState(loginPageResponse)
    const navigate = useNavigate()

    const onError = (error: AxiosError) => {
        setLoginResponse({ isSuccess: false, message: parseErrorMessage(error) })
    }

    const setMessageOnSuccess = (response: AxiosResponse) => {
        setLoginResponse({ isSuccess: true, message: parseResponse(response).message })
    }

    const confirmEmailMutation = useMutation(
        (token: string) => {
            return axios.post('/api/auth/confirmEmail', { token })
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setMessageOnSuccess(response)
            },
        }
    )

    const forgotPasswordMutation = useMutation(
        (data: { email: string }) => {
            return axios.post('/api/auth/forgotPassword', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                setMessageOnSuccess(response)
            },
        }
    )

    const resetPasswordMutation = useMutation(
        (data: ResetPasswordRequest) => {
            return axios.post('/api/auth/resetPassword', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setMessageOnSuccess(response)
            },
        }
    )

    return {
        confirmEmail: confirmEmailMutation.mutate,
        forgotPassword: forgotPasswordMutation.mutate,
        resetPassword: resetPasswordMutation.mutate,
    }
}
