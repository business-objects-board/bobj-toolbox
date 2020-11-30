import { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga";

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
          ReactGA.event({
            category: "Users",
            action: "Retrieve users",
          });
        })
        .catch((err) => {
          console.log(err.message);
          ReactGA.event({
            category: "Users",
            action: "Error during retrieving",
          });
        });
    }
  }, [token, url]);

  let count;
  if (users.length === 0) {
    count = (
      <div className="p-4">
        No users extracted from the BOBJ system. Just provide the credentials
        and hit "Connect" to get the user list.{" "}
        <strong>
          No credential is sent to the webserver, it is only used to call the
          BOBJ REST api (<i>cms.local</i> field).
        </strong>{" "}
        The REST API is created by adding <code>:6405/biprws</code> to the{" "}
        <i>cms.local</i> field.
      </div>
    );
  } else {
    count = (
      <div className="p-4">
        <strong>{users.length}</strong> users extracted from the BOBJ system.
        Copy it to Excel / GSheet / you name it to work on the data.
      </div>
    );
  }

  return (
    <div>
      {count}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4">ID</th>
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
        <tbody className="text-gray-700">
          {users.map((u) => (
            <UserItem key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
