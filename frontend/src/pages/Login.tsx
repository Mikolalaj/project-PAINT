import { Anchor, Center, Container, Paper, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { loginPageResponse, userState } from '../atoms'
import LogInForm from '../components/login/LogInForm'
import ResultAlert from '../components/login/ResultAlert'
import SignUpForm from '../components/login/SignUpForm'
import { useAccount } from '../hooks/useAccount'

export const LoginForm = atom({
    key: 'LoginForm',
    default: false,
})

export default function LoginPage() {
    const user = useRecoilValue(userState)
    const [loginResponse, setLoginResponse] = useRecoilState(loginPageResponse)
    const [isSignUp, setIsSignUp] = useRecoilState(LoginForm)

    const [searchParams] = useSearchParams()

    const { confirmEmail } = useAccount()

    useEffect(() => {
        async function checkToken() {
            const token = searchParams.get('token')
            if (token) {
                confirmEmail(token)
            }
        }
        checkToken()
    }, [confirmEmail, searchParams])

    if (user) {
        return <Navigate to='/' />
    }

    const toggleForm = () => {
        setLoginResponse(null)
        setIsSignUp(v => !v)
    }

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center>
                <Container style={{ width: 550 }}>
                    <Title order={2} ta='center' mb={15}>
                        {isSignUp ? 'Create a new account! ' : 'Welcome back! Log in to '}
                        {!isSignUp && (
                            <Text component='span' inherit variant='gradient' gradient={{ from: 'red.7', to: 'violet.6', deg: 120 }}>
                                Application Name
                            </Text>
                        )}
                    </Title>
                    <Text color='dimmed' size='sm' align='center' mb={20}>
                        {isSignUp ? 'Have an account already? ' : "Don't have an account yet? "}
                        <Anchor size='sm' color='pink.6' onClick={toggleForm}>
                            {isSignUp ? 'Log in here' : 'Create account'}
                        </Anchor>
                    </Text>
                    <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                        <ResultAlert response={loginResponse} />
                        {isSignUp ? <SignUpForm /> : <LogInForm />}
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
