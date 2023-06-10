import { Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useLogin } from '../../hooks/useLogin'
import { emailValidation, passwordValidation } from '../../utils/validations'

export default function SignUpForm() {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        validate: {
            firstName: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            lastName: value => (value.length < 2 ? 'Last must have at least 2 letters' : null),
            email: emailValidation,
            password: passwordValidation,
            confirmPassword: (val, values) => (val !== values.password ? 'Passwords do not match' : null),
            terms: val => (val ? null : 'You must agree to sell your soul to us!!! 😈'),
        },
    })

    const { signUp } = useLogin()

    return (
        <form noValidate onSubmit={form.onSubmit(values => signUp(values))}>
            <Stack>
                <TextInput required label='First Name' placeholder='Your first name' {...form.getInputProps('firstName')} />
                <TextInput required label='Last Name' placeholder='Your last name' {...form.getInputProps('lastName')} />
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='hello@mail.com'
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Password'
                    description='Password must include at least one letter, number and special character'
                    placeholder='Your password'
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Confirm password'
                    placeholder='Confirm password'
                    {...form.getInputProps('confirmPassword')}
                />
                <Checkbox required label='I agree to sell my soul and privacy to this corporation' {...form.getInputProps('terms')} />
            </Stack>
            <Group position='apart' mt='xl'>
                <Button fullWidth type='submit'>
                    Sign Up
                </Button>
            </Group>
        </form>
    )
}
