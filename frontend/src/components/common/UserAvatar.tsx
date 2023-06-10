import { Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

interface UserAvatarProps {
    user: {
        firstName: string
        lastName: string
    } | null
}

const colors = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']

function getRandomColor(user: { firstName: string; lastName: string }) {
    const hash = user.firstName.length + user.lastName.length
    return colors[hash % colors.length]
}

function UserAvatar({ user }: UserAvatarProps) {
    const navigate = useNavigate()

    if (!user) return null

    return (
        <Avatar color={getRandomColor(user)} radius='xl' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
        </Avatar>
    )
}

export default UserAvatar
