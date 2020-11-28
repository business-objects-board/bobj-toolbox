import GroupItem from "./GroupItem";

const UserItem = (props) => {
  const { user } = props;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>
        {user.groups.map((group) => (
          <GroupItem key={group} group={group} />
        ))}
      </td>
      <td>{user.disabled ? "1" : "0"}</td>
      <td>{user.changePasswordAtNextLogon ? "1" : "0"}</td>
      <td>{user.description}</td>
      <td>{user.lastlogon}</td>
      <td>{user.named ? "1" : "0"}</td>
    </tr>
  );
};

export default UserItem;
