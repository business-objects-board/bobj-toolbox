import axios from "axios";

export const bobjCmsUsers = async (url, token) => {
  // get the results
  let result = await axios.post(
    `${url}/v1/cmsquery`,
    {
      query:
        "SELECT TOP 1000000 SI_EMAIL_ADDRESS, SI_FORCE_PASSWORD_CHANGE, SI_NAME, SI_ID, SI_USERGROUPS, SI_USERFULLNAME, SI_ALIASES, SI_DESCRIPTION, SI_LASTLOGONTIME, SI_PASSWORDEXPIRE, SI_NAMEDUSER FROM CI_SYSTEMOBJECTS Where SI_KIND='User' ORDER BY SI_NAME",
    },
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-SAP-LogonToken": token,
      },
    }
  );
  // clean the results
  result = result.data.entries.map((u) => {
    // transform the SI_USERGROUPS object in an array
    let groups = Object.values(u.SI_USERGROUPS);
    // remove the last element (size of the array)
    groups.pop();

    // transform the SI_ALIASES object in an array
    let aliases = Object.values(u.SI_ALIASES);
    // remove the last element (size of the array)
    aliases.pop();
    // transform the aliases
    aliases = aliases.map((a) => {
      return {
        id: a.SI_ID,
        name: a.SI_NAME,
        disabled: a.SI_DISABLED,
      };
    });

    // compute disabled based on aliases
    let disabled = aliases.every((a) => !a.disabled);

    // convert
    return {
      id: u.SI_ID,
      cuid: u.SI_CUID,
      name: u.SI_NAME,
      fullname: u.SI_USERFULLNAME,
      email: u.SI_EMAIL_ADDRESS,
      aliases: aliases,
      disabled: disabled,
      changePasswordAtNextLogon: u.SI_FORCE_PASSWORD_CHANGE,
      description: u.SI_DESCRIPTION,
      lastlogon: u.SI_LASTLOGONTIME,
      named: u.SI_NAMEDUSER,
      groups: groups,
    };
  });
  return result;
};
