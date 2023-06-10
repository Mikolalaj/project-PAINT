import { Button } from '@mantine/core'
import TicketsTable from '../components/tickets/TicketsTable'
import { useNavigate } from 'react-router-dom'
import { IconArrowBack } from '@tabler/icons-react'

const data = {
    projectName: 'Project A',
    projectId: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
    tickets: [
        {
            id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
            name: 'Ticket 1',
            description: 'This is ticket 1. It involves developing a new website.',
            assignedTo: {
                id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
                firstName: 'Alice',
                lastName: 'Hatter',
            },
            isDone: false,
        },
        {
            id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
            name: 'Ticket 2',
            description: 'This is ticket 2 description.',
            assignedTo: {
                id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
                firstName: 'Bob',
                lastName: 'White',
            },
            isDone: true,
        },
        {
            id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
            name: 'Ticket 2',
            description: 'This is ticket 2 description.',
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
