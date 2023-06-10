import { TextInput, Button, Group, Stack, Rating, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

export type FormValues = {
    name: string
    description: string
    rating: number
}

type ProjectFormProps = {
    type: 'add' | 'edit'
    data?: FormValues
    onSubmit: (args: FormValues) => void
}

function ProjectForm({ type, data, onSubmit }: ProjectFormProps) {
    const form = useForm<FormValues>({
        initialValues: data ?? {
            name: '',
            description: '',
            rating: 1,
        },
        validate: {
            name: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        },
    })

    return (
        <form onSubmit={form.onSubmit(values => onSubmit(values))}>
            <Stack>
                <TextInput
                    data-autofocus
                    withAsterisk
                    label='Name'
                    placeholder='Name of the project'
                    {...form.getInputProps('name')}
                />
                <Textarea label='Description' placeholder='Project descriptpion...' {...form.getInputProps('description')} />
                <Rating size='lg' name='rating' fractions={2} {...form.getInputProps('rating')} />

                <Group position='right' mt='md'>
                    <Button type='submit'>{type === 'add' ? 'Add' : 'Edit'}</Button>
                </Group>
            </Stack>
        </form>
    )
}

export default ProjectForm
