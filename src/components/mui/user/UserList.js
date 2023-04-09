import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../../store/features/userSlice";

const UserList = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const handleUpdate = (user) => {
    const updatedName = prompt("Enter updated name:", user.name);
    const updatedEmail = prompt("Enter updated email:", user.email);
    if (updatedName && updatedEmail) {
      dispatch(
        updateUser({ id: user.id, name: updatedName, email: updatedEmail })
      );
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <div>
            <strong>{user.name}</strong> - {user.email}
          </div>
          <button onClick={() => handleUpdate(user)}>Update</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
