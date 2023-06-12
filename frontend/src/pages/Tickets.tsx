import { Button } from '@mantine/core'
import TicketsTable from '../components/tickets/TicketsTable'
import { useNavigate } from 'react-router-dom'
import { IconArrowBack } from '@tabler/icons-react'

const data = {
    projectName: 'Project A',
    projectId: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
    tickets: [
        {
            id: '14171ea9-5092-44eb-b9bd-6778b5a40f79',
            name: 'Ticket 1',
            description: 'This is ticket 1. It involves developing a new website.',
            assignedTo: {
                id: 'ee6dcb92-f01d-4466-8814-30f0e041993a',
                firstName: 'Alice',
                lastName: 'Hatter',
            },
            isDone: false,
        },
        {
            id: 'bcc204dd-034e-411e-823b-1359bc7bb7ac',
            name: 'Ticket 2',
            description: 'This is ticket 2 description.',
            assignedTo: {
                id: '73524105-b12b-4e86-846f-bb45ab0ae6fd',
                firstName: 'Bob',
                lastName: 'White',
            },
            isDone: true,
        },
        {
            id: '104a3b56-4947-4c99-8bff-66def24233d2',
            name: 'Ticket 3',
            description: 'This is ticket 3 description.',
            assignedTo: null,
            isDone: true,
        },
    ],
}

export default function Tickets() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Tickets for {data.projectName}</h1>
            <Button mb='lg' leftIcon={<IconArrowBack />} variant='light' onClick={() => navigate('/dashboard')}>
                Back to projects
            </Button>
            <TicketsTable {...data} />
        </>
    )
}
