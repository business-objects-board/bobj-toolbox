import GroupItem from "./GroupItem";

const UserItem = (props) => {
  const { user } = props;
  return (
    <tr>
      <td className="border py-1 px-1">{user.id}</td>
      <td className="border py-1 px-1">{user.name}</td>
      <td className="border py-1 px-1">{user.fullname}</td>
      <td className="border py-1 px-1">{user.email}</td>
      <td className="border py-1 px-1">
        {user.groups.map((group) => (
          <GroupItem key={group} group={group} />
        ))}
      </td>
      <td className="border py-1 px-1">{user.disabled ? "1" : "0"}</td>
      <td className="border py-1 px-1">
        {user.changePasswordAtNextLogon ? "1" : "0"}
      </td>
      <td className="border py-1 px-1">{user.description}</td>
      <td className="border py-1 px-1">{user.lastlogon}</td>
      <td className="border py-1 px-1">{user.named ? "1" : "0"}</td>
    </tr>
  );
};

export default UserItem;
