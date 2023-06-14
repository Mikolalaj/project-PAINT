import { useState } from 'react';
import { createStyles, Text, Group, Button, Modal, TextInput } from '@mantine/core';
import { IconAt, IconEdit, IconTrash } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import UserAvatar from '../components/common/UserAvatar';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  user: {
    firstName: string;
    lastName: string;
  } | null;
  title: string;
  email: string;
  onSaveChanges: (firstName: string, lastName: string, title: string, email: string) => void;
  onDeleteAccount: () => void;
}

export function UserInfoIcons({
  user,
  title,
  email,
  onSaveChanges,
  onDeleteAccount,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(user ? user.firstName : '');
  const [editedLastName, setEditedLastName] = useState(user ? user.lastName : '');
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedEmail, setEditedEmail] = useState(email);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    onSaveChanges(editedFirstName, editedLastName, editedTitle, editedEmail);
    closeEditModal();
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = (confirmed: boolean) => {
    setShowDeleteConfirmation(false);
    if (confirmed) {
      onDeleteAccount();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Group noWrap>
        <UserAvatar user={user} size="xl" /> 
        <div>
          <Text fz="lg" tt="uppercase" fw={700} c="dimmed">
            {title}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {user && user.firstName}
          </Text>
          <Text fz="lg" fw={500} className={classes.name}>
            {user && user.lastName}
          </Text>

          <Group noWrap spacing={10} mt={10}>
            <IconAt stroke={1.5} size="1.5rem" className={classes.icon} />
            <Text fz="xf" c="dimmed">
              {email}
            </Text>
          </Group>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outline"
              leftIcon={<IconEdit />}
              onClick={openEditModal}
              size="sm"
              style={{ marginRight: '8px' }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconTrash />}
              onClick={confirmDeleteAccount}
              size="sm"
              style={{ marginRight: '8px' }}
            >
              Delete
            </Button>
          </div>

          <Modal
            opened={isEditing}
            onClose={closeEditModal}
            title="Edit your data"
            size="xs"
            withCloseButton
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextInput
                label="First Name"
                value={editedFirstName}
                onChange={(event) => setEditedFirstName(event.currentTarget.value)}
                required
                style={{ marginBottom: '16px' }}
              />
              <TextInput
                label="Last Name"
                value={editedLastName}
                onChange={(event) => setEditedLastName(event.currentTarget.value)}
                required
                style={{ marginBottom: '16px' }}
              />
              <TextInput
                label="Title"
                value={editedTitle}
                onChange={(event) => setEditedTitle(event.currentTarget.value)}
                required
                style={{ marginBottom: '16px' }}
              />
              <TextInput
                label="Email"
                value={editedEmail}
                onChange={(event) => setEditedEmail(event.currentTarget.value)}
                required
                style={{ marginBottom: '16px' }}
              />
              <Button onClick={saveChanges}>Save</Button>
            </div>
          </Modal>

          <Modal
            opened={showDeleteConfirmation}
            onClose={() => handleDeleteConfirmation(false)}
            title="Are you sure you want to delete your account?"
            size="xs"
            withCloseButton
          >
            <Button onClick={() => handleDeleteConfirmation(true)} color="red" variant="outline">
              Yes
            </Button>
            <Button onClick={() => handleDeleteConfirmation(false)} variant="outline">
              No
            </Button>
          </Modal>
        </div>
      </Group>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState({
    firstName: 'Malgosia',
    lastName: 'Pytka',
  });
  const [title, setTitle] = useState('Frontend Developer');
  const [email, setEmail] = useState('malgosia.pytka@gmail.com');

  const onSaveChanges = (
    editedFirstName: string,
    editedLastName: string,
    editedTitle: string,
    editedEmail: string
  ) => {
    setUser({ firstName: editedFirstName, lastName: editedLastName });
    setTitle(editedTitle);
    setEmail(editedEmail);
  };

  const onDeleteAccount = () => {};

  return (
    <>
      <h1>Profile</h1>
      <UserInfoIcons
        user={user}
        title={title}
        email={email}
        onSaveChanges={onSaveChanges}
        onDeleteAccount={onDeleteAccount}
      />
    </>
  );
}
