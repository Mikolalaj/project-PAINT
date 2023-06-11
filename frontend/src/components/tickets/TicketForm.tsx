import { TextInput, Button, Group, Stack, Textarea, Checkbox, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { forwardRef } from 'react'
import UserAvatar from '../common/UserAvatar'

const users = [
    {
        value: 'ee6dcb92-f01d-4466-8814-30f0e041993a',
        label: 'Alice Hatter',
        assignedTo: {
            firstName: 'Alice',
            lastName: 'Hatter',
        },
    },
    {
        value: '73524105-b12b-4e86-846f-bb45ab0ae6fd',
        label: 'Bob White',
        assignedTo: {
            firstName: 'Bob',
            lastName: 'White',
        },
    },
]

type FormValues = {
    name: string
    description: string
    assignedTo: string | null
    isDone: boolean
}

export type InitialValues = {
    name: string
    description: string
    assignedTo: {
        id: string
        firstName: string
        lastName: string
    } | null
    isDone: boolean
}

type TicketFormProps = {
    type: 'add' | 'edit'
    data?: InitialValues
    onSubmit: (args: InitialValues) => void
}

function TicketForm({ type, data, onSubmit }: TicketFormProps) {
    const form = useForm<FormValues>({
        initialValues: data
            ? {
                  name: data.name,
                  description: data.description,
                  assignedTo: data.assignedTo?.id || null,
                  isDone: data.isDone,
              }
            : {
                  name: '',
                  description: '',
                  assignedTo: null,
                  isDone: false,
              },
        validate: {
            name: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        },
    })

    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        label: string
        assignedTo: {
            firstName: string
            lastName: string
        }
    }

    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, assignedTo, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <UserAvatar size='sm' user={{ firstName: assignedTo.firstName, lastName: assignedTo.lastName }} />
                {label}
            </Group>
        </div>
    ))

    const addMoreData = (vales: FormValues): InitialValues => {
        const user = users.find(user => user.value === vales.assignedTo)
        return {
            name: vales.name,
            description: vales.description,
            assignedTo: {
                id: user?.value || '',
                firstName: user?.assignedTo.firstName || '',
                lastName: user?.assignedTo.lastName || '',
            },
            isDone: vales.isDone,
        }
    }

    return (
        <form onSubmit={form.onSubmit(values => onSubmit(addMoreData(values)))}>
            <Stack>
                <TextInput
                    data-autofocus
                    withAsterisk
                    label='Name'
                    placeholder='Name of the project'
                    {...form.getInputProps('name')}
                />
                <Select
                    itemComponent={SelectItem}
                    data={users}
                    label='Assigned to'
                    dropdownPosition='bottom'
                    {...form.getInputProps('assignedTo')}
                />
                <Checkbox label='Completed' {...form.getInputProps('isDone', { type: 'checkbox' })} />
                <Textarea label='Description' placeholder='Project description...' {...form.getInputProps('description')} />
                <Group position='right' mt='md'>
                    <Button type='submit'>{type === 'add' ? 'Add' : 'Edit'}</Button>
                </Group>
            </Stack>
        </form>
    )
}

export default TicketForm
