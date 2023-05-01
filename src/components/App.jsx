import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
const LS_KEY = 'allcontacts';

export function App() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  const AddContact = text => {
    if (contacts.find(contact => contact.name === text.name)) {
      alert(`${text.name} is already in contacts`);
      return false;
    }

    const contact = {
      id: nanoid(),
      name: text.name,
      number: text.number,
    };

    setContacts([contact, ...contacts]);
    const arrContacts = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    arrContacts.push(contact);

    localStorage.setItem(LS_KEY, JSON.stringify(arrContacts));
    return true;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={AddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
