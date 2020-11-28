import { useContext, useEffect, useState } from "react";
import { bobjCmsUsers } from "../api/cmsquery";

import { ApiContext } from "../providers/ApiProvider";

import UserItem from "./UserItem";

const Users = () => {
  const { url, token } = useContext(ApiContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      bobjCmsUsers(url, token)
        .then((users) => {
          setUsers(users);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [token, url]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Groups</th>
            <th>Disabled</th>
            <th>ChangePasswordAtNextLogon</th>
            <th>Description</th>
            <th>LastLogon</th>
            <th>Concurrent</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserItem key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
