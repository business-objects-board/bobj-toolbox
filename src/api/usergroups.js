import axios from "axios";

export const bobjUsers = async (url, token) => {
  const result = await axios.get(`${url}/v1/users`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-SAP-LogonToken": token,
    },
  });
  return result.data.entries;
};

export const bobjUser = async (url, token, userId) => {
  const result = await axios.get(`${url}/v1/user/${userId}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-SAP-LogonToken": token,
    },
  });
  return result.data;
};

export const bobjGroups = async (url, token) => {
  const result = await axios.get(`${url}/v1/usergroups`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-SAP-LogonToken": token,
    },
  });
  return result.data.entries;
};

/**
 * Return
 * @param {*} url
 * @param {*} token
 */
export const bobjGroupUsers = async (url, token, groupId) => {
  const result = await axios.get(`${url}/v1/usergroups/${groupId}/users`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-SAP-LogonToken": token,
    },
  });
  return result.data.entries;
};

export const bobjGroup = async (url, token, groupId) => {
  const result = await axios.get(`${url}/v1/usergroups/${groupId}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-SAP-LogonToken": token,
    },
  });
  return result.data;
};
