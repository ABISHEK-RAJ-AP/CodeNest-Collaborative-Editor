import PropTypes from 'prop-types';
import React from 'react';
import Avatar from 'react-avatar';

// This component displays a user's avatar and username
const Client = ({ username }) => {
  return (
    <div className="client">
      <Avatar name={username || 'Anonymous'} size={50} round="14px" />
      <span className="userName">{username || 'Anonymous'}</span>
    </div>
  );
};

// Prop type validation
Client.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Client;
