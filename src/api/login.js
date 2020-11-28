import axios from "axios";

export const bobjLogin = async (url, user, pw, auth) => {
  const result = await axios.post(
    `${url}/v1/logon/long`,
    {
      username: user,
      password: pw,
      auth: auth,
    },
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  return result.data.logontoken;
};
