import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useLogin } from '../../hooks/useLogin'
import { emailValidation } from '../../utils/validations'

export default function LogInForm() {
    const logInForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: emailValidation,
            password: val => (val.length < 1 ? 'Password is required' : null),
        },
    })

    const { signIn } = useLogin()

    return (
        <form noValidate onSubmit={logInForm.onSubmit(values => signIn(values))}>
            <Stack mb={25}>
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='Your email'
                    {...logInForm.getInputProps('email')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Password'
                    placeholder='Your password'
                    {...logInForm.getInputProps('password')}
                />
            </Stack>
            <Button fullWidth type='submit'>
                Log In
            </Button>
        </form>
    )
}
