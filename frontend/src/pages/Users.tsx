import { useState } from 'react';
import { Table, Input, Button } from '@mantine/core';

const users = [
  {
    number: 1,
    name: 'Małgorzata',
    surname: 'Pytka',
    role: 'Frontend Developer'
  },
  {
    number: 2,
    name: 'Anna',
    surname: 'Kowalska',
    role: 'UI Designer'
  },
  {
    number: 3,
    name: 'Jan',
    surname: 'Nowakowski',
    role: 'Backend Developer'
  },
  {
    number: 4,
    name: 'Maria',
    surname: 'Lewandowska',
    role: 'DB Administrator'
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleDeleteUser = (number) => {
    const updatedUsers = filteredUsers.filter((user) => user.number !== number);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.name} ${user.surname}`;
      return fullName.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  };

  const ths = (
    <tr>
      <th>Lp.</th>
      <th>Imię</th>
      <th>Nazwisko</th>
      <th>Rola</th>
      <th>Akcje</th>
    </tr>
  );

  const rows = filteredUsers.map((user) => (
    <tr key={user.number}>
      <td>{user.number}</td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.role}</td>
      <td>
        <Button
          onClick={() => handleDeleteUser(user.number)}
          variant="outline"
          color="red"
          size="xs"
        >
          Usuń
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Input
        placeholder="Wyszukaj użytkownika"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
