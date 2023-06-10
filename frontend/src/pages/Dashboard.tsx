import { ProjectsTable } from '../components/projects/ProjectsTable'

const projects = [
    {
        id: '75a82147-797d-4d41-a1a8-1fe1ef5e822e',
        name: 'Project A',
        description: 'This is project A. It involves developing a new website.',
        rating: 4,
        progress: 80,
    },
    {
        id: 'da501eea-ffbb-41ed-b8fb-8419843c7af5',
        name: 'Project B',
        description: 'Project B is focused on creating a mobile application for iOS and Android.',
        rating: 1,
        progress: 50,
    },
    {
        id: 'a2cb7a6e-1a32-4089-b93b-8cca386d3b40',
        name: 'Project C',
        description: 'This project aims to improve the existing product and add new features.',
        rating: 2,
        progress: 100,
    },
    {
        id: '337e5f23-2e3b-4709-a6be-1693ad0effa2',
        name: 'Project D',
        description: 'Project D involves building a backend system for data processing.',
        rating: 4,
        progress: 70,
    },
    {
        id: '0322039d-2387-4ec6-a787-09a573a8f1cf',
        name: 'Project E',
        description: 'This project is about redesigning the user interface of an existing application.',
        rating: 5,
        progress: 20,
    },
]

export default function Dashboard() {
    return (
        <>
            <h1>Projects</h1>
            <ProjectsTable data={projects} />
        </>
    )
}
