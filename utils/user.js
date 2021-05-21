const users = [];

/**
 * * Join user to chat
 */

const joinUser = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

/**
 * * Find user
 */

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

/**
 * * Remove user from the user list
 */

const disconnectUser = (id) => {
  const index = users.find((user) => user.id === id);
  if (index === -1) {
    users.splice(index, 1);
  }
};

/**
 * * Get room user
 */

const roomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { joinUser, getCurrentUser, disconnectUser, roomUsers };
