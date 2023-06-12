import { useState } from 'react';
import { createStyles, Avatar, Text, Group, Button, Modal, TextInput } from '@mantine/core';
import { IconPhoneCall, IconAt, IconEdit, IconTrash } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  onSaveChanges: (name: string, title: string, phone: string, email: string) => void;
  onDeleteAccount: () => void;
}

export function UserInfoIcons({
  avatar,
  name,
  title,
  phone,
  email,
  onSaveChanges,
  onDeleteAccount,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedEmail, setEditedEmail] = useState(email);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    onSaveChanges(editedName, editedTitle, editedPhone, editedEmail);
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
        <Avatar src={avatar} size={250} radius="50%" />
        <div>
          <Text fz="lg" tt="uppercase" fw={700} c="dimmed">
            {title}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={10}>
            <IconAt stroke={1.5} size="1.5rem" className={classes.icon} />
            <Text fz="xf" c="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={10}>
            <IconPhoneCall stroke={1.5} size="1.5rem" className={classes.icon} />
            <Text fz="xf" c="dimmed">
              {phone}
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
                label="Name"
                value={editedName}
                onChange={(event) => setEditedName(event.currentTarget.value)}
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
                label="Phone"
                value={editedPhone}
                onChange={(event) => setEditedPhone(event.currentTarget.value)}
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
            <Button onClick={() => handleDeleteConfirmation(false)}variant="outline"> 
              No
            </Button>
          </Modal>
        </div>
      </Group>
    </div>
  );
}

export default function Profile() {
  const [name, setName] = useState('Malgosia Pytka');
  const [title, setTitle] = useState('Frontend Developer');
  const [phone, setPhone] = useState('123456789');
  const [email, setEmail] = useState('malgosia.pytka@gmail.com');
  const [avatar, setAvatar] = useState('https://as2.ftcdn.net/v2/jpg/02/13/52/07/1000_F_213520743_0UqSd3TUYdBK7ep7p7YT1zTX7oUf86Pz.jpg');

  const onSaveChanges = (editedName: string, editedTitle: string, editedPhone: string, editedEmail: string) => {
    setName(editedName);
    setTitle(editedTitle);
    setPhone(editedPhone);
    setEmail(editedEmail);
  };

  const onDeleteAccount = () => {
    
  };

  return (
    <>
      <h1>Profile</h1>
      <UserInfoIcons
        avatar={avatar}
        name={name}
        title={title}
        phone={phone}
        email={email}
        onSaveChanges={onSaveChanges}
        onDeleteAccount={onDeleteAccount}
      />
    </>
  );
}
