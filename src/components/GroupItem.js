import { useContext, useEffect, useState } from "react";
import { bobjGroup } from "../api/usergroups";

import { ApiContext } from "../providers/ApiProvider";

const GroupItem = (props) => {
  const { url, token } = useContext(ApiContext);
  const { group } = props;
  const [groupInfo, setGroupInfo] = useState(group);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // group 1 is Everyone. We skip a lot of rest calls, once per user !
      if (group === 1) {
        setGroupInfo("Everyone");
        setLoading(false);
      } else {
        bobjGroup(url, token, group)
          .then((result) => {
            setGroupInfo(result.name);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }, [token, url, group]);

  if (loading) {
    return (
      <div className="text-gray-300 italic flex space-x-2">
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clip-rule="evenodd"
          />
        </svg>
        <div>{groupInfo}</div>
      </div>
    );
  } else {
    return <div>{groupInfo}</div>;
  }
};

export default GroupItem;
