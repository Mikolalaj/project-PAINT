import { useState } from 'react'
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    Rating,
    Progress,
    ActionIcon,
    Button,
    Grid,
    Modal,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import { useDisclosure } from '@mantine/hooks'
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPencil, IconTrash, IconPlus } from '@tabler/icons-react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../atoms'
import { Link } from 'react-router-dom'
import ProjectForm, { FormValues } from './ProjectForm'

const useStyles = createStyles(theme => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}))

interface RowData {
    id: string
    name: string
    description: string
    rating: number
    progress: number
}

interface TableSortProps {
    data: RowData[]
}

interface ThProps {
    children: React.ReactNode
    reversed?: boolean
    sorted?: boolean
    onSort?: () => void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles()
    const Icon = sorted === true ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position='apart'>
                    <Text fw={500} fz='sm'>
                        {children}
                    </Text>
                    {sorted !== undefined && (
                        <Center className={classes.icon}>
                            <Icon size='0.9rem' stroke={1.5} />
                        </Center>
                    )}
                </Group>
            </UnstyledButton>
        </th>
    )
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim()
    return data.filter(item =>
        keys(data[0]).some(key => {
            const x = item[key]
            if (typeof x === 'string') {
                return x.toLowerCase().includes(query)
            }
            return false
        })
    )
}

function sortData(data: RowData[], payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }) {
    const { sortBy } = payload

    if (!sortBy) {
        return filterData(data, payload.search)
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                if (sortBy === 'rating' || sortBy === 'progress') {
                    return b[sortBy] - a[sortBy]
                }
                return b[sortBy].localeCompare(a[sortBy])
            }

            if (sortBy === 'rating' || sortBy === 'progress') {
                return a[sortBy] - b[sortBy]
            }
            return a[sortBy].localeCompare(b[sortBy])
        }),
        payload.search
    )
}

export function ProjectsTable({ data }: TableSortProps) {
    const user = useRecoilValue(userState)
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null)
    const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false)
    const [search, setSearch] = useState('')
    const [sortedData, setSortedData] = useState(data)
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false
        setReverseSortDirection(reversed)
        setSortBy(field)
        setSortedData(sortData(data, { sortBy: field, reversed, search }))
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setSearch(value)
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }))
    }

    const rows = sortedData.map(row => (
        <tr key={row.name}>
            <td>
                <Link style={{ color: 'black' }} to={`/dashboard/${row.id}`}>
                    {row.name}
                </Link>
            </td>

            <td>
                <Rating value={row.rating} fractions={2} readOnly />
            </td>
            <td>
                <Progress radius='xl' size='xl' value={row.progress} />
            </td>
            <td>{row.description}</td>
            <td>
                {user?.isAdmin && (
                    <Group spacing={0} position='right'>
                        <ActionIcon
                            onClick={() => {
                                setSelectedRow(row)
                                openEdit()
                            }}>
                            <IconPencil size='1rem' stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            color='red'
                            onClick={() => {
                                openDelete()
                                setSelectedRow(row)
                            }}>
                            <IconTrash size='1rem' stroke={1.5} />
                        </ActionIcon>
                    </Group>
                )}
            </td>
        </tr>
    ))

    const addNewProject = (args: FormValues) => {
        setSortedData(
            sortData([...data, { id: 'newid', progress: 0, ...args } as RowData], { sortBy, reversed: reverseSortDirection, search })
        )
        closeAdd()
    }

    const editProject = (args: FormValues) => {
        // Send edit request
        console.log(args)
        closeEditModal()
    }

    const deleteProject = () => {
        // Send delete request
        closeDeleteModal()
    }

    const closeDeleteModal = () => {
        closeDelete()
        setSelectedRow(null)
    }

    const closeEditModal = () => {
        closeEdit()
        setSelectedRow(null)
    }
    return (
        <>
            <Modal opened={openedDelete} onClose={closeDeleteModal} centered>
                Are you sure you want to delete project "{selectedRow?.name}"?
                <Group position='center' mt='lg'>
                    <Button variant='outline' onClick={closeDeleteModal}>
                        No
                    </Button>
                    <Button color='red' onClick={deleteProject}>
                        Yes
                    </Button>
                </Group>
            </Modal>
            <Modal opened={openedEdit} onClose={closeEditModal} title='Edit project' centered>
                <ProjectForm type='edit' onSubmit={editProject} data={selectedRow ?? undefined} />
            </Modal>
            <Modal opened={openedAdd} onClose={closeAdd} title='Add a new project' centered>
                <ProjectForm type='add' onSubmit={addNewProject} />
            </Modal>
            <Grid grow mb={'md'}>
                <Grid.Col span={10}>
                    <TextInput
                        placeholder='Search by name or description'
                        icon={<IconSearch size='0.9rem' stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button fullWidth leftIcon={<IconPlus />} onClick={openAdd}>
                        New project
                    </Button>
                </Grid.Col>
            </Grid>
            <ScrollArea>
                <Table horizontalSpacing='md' verticalSpacing='xs' miw={700}>
                    <thead>
                        <tr>
                            <Th sorted={sortBy === 'name'} reversed={reverseSortDirection} onSort={() => setSorting('name')}>
                                Name
                            </Th>
                            <Th sorted={sortBy === 'rating'} reversed={reverseSortDirection} onSort={() => setSorting('rating')}>
                                Rating
                            </Th>
                            <Th sorted={sortBy === 'progress'} reversed={reverseSortDirection} onSort={() => setSorting('progress')}>
                                Progress
                            </Th>
                            <Th>Description</Th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <tr>
                                <td colSpan={Object.keys(data[0]).length}>
                                    <Text weight={500} align='center'>
                                        Nothing found
                                    </Text>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
