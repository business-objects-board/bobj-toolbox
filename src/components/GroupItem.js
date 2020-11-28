import { useContext, useEffect, useState } from "react";
import { bobjGroup } from "../api/usergroups";

import { ApiContext } from "../providers/ApiProvider";

const GroupItem = (props) => {
  const { url, token } = useContext(ApiContext);
  const { group } = props;
  const [groupInfo, setGroupInfo] = useState(group);

  useEffect(() => {
    if (token) {
      bobjGroup(url, token, group)
        .then((result) => {
          setGroupInfo(result.name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [token, url, group]);
  return <div>{groupInfo}</div>;
};

export default GroupItem;
