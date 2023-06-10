import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse, User, userState } from '../atoms'
import { LoginForm } from '../pages/Login'
import { parseErrorMessage, parseResponse } from '../utils/axios'

interface SignInRequestBody {
    email: string
    password: string
}

interface SignUpRequestBody extends SignInRequestBody {
    firstName: string
    lastName: string
}

export function useLogin() {
    const setUser = useSetRecoilState(userState)
    const setLoginResponse = useSetRecoilState(loginPageResponse)
    const setIsSignUp = useSetRecoilState(LoginForm)
    const navigate = useNavigate()

    const onError = (error: AxiosError) => {
        setLoginResponse({ isSuccess: false, message: parseErrorMessage(error) })
    }

    const signUpMutation = useMutation(
        (data: SignUpRequestBody) => {
            return axios.post('/api/auth/signUp', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse) => {
                setLoginResponse({ isSuccess: true, message: parseResponse(response).message })
                setIsSignUp(false)
            },
        }
    )

    const signInMutation = useMutation(
        (data: SignInRequestBody) => {
            return axios.post('/api/auth/signIn', data)
        },
        {
            onError,
            onSuccess: (response: AxiosResponse<{ user: User }>) => {
                const responseData = parseResponse(response)
                setUser(responseData.user)
                navigate('/')
            },
        }
    )

    const logOutMutation = useMutation(
        () => {
            return axios.post('/api/auth/signOut')
        },
        {
            onError,
            onSuccess: () => {
                setUser(null)
                navigate('/login')
            },
        }
    )

    return {
        signIn: signInMutation.mutate,
        signUp: signUpMutation.mutate,
        logOut: logOutMutation.mutate,
    }
}
