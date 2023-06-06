// import axios, { isAxiosError } from 'axios'
import { atom } from 'recoil'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
}

async function getUser() {
    // try {
    //     const { data, status } = await axios.get('/api/users')
    //     if (status !== 200) {
    //         return null
    //     }
    //     return data.user
    // } catch (error) {
    //     if (isAxiosError(error)) {
    //         if (error.response?.status === 401) {
    //             return null
    //         }
    //     }
    // }
    return {
        id: '1',
        email: 'user@pw.edu.pl',
        firstName: 'Anna',
        lastName: 'Nowak',
        isAdmin: false,
    }
}

const userState = atom<User | null>({
    key: 'userState',
    default: getUser(),
})

export interface Response {
    isSuccess: boolean
    message: string
}

const loginPageResponse = atom<Response | null>({
    key: 'loginPageResponse',
    default: null,
})

export { userState, loginPageResponse }
