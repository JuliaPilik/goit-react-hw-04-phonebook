import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export default function ContactItem({ id, name, number, onDeleteContact }) {
  return (
    <li key={id} className={css.contactItem}>
      <span>
        {name}: {number}
      </span>
      <button onClick={() => onDeleteContact(id)} className={css.buttonDelete}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func,
};
