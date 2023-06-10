import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Response } from '../../atoms'

export default function ResultAlert({ response }: { response: Response | null }) {
    if (!response) {
        return null
    }
    return (
        <Alert
            icon={<IconAlertCircle size={16} />}
            title={response.isSuccess ? 'Success!' : 'Bummer!'}
            color={response.isSuccess ? 'green' : 'red'}
            radius='md'
            mb={15}>
            {response.message}
        </Alert>
    )
}
