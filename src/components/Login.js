import { useContext, useState } from "react";
import { useInput } from "../hooks/input";

import { ApiContext } from "../providers/ApiProvider";
import { bobjLogin } from "../api/login";

const Login = () => {
  const { setApi } = useContext(ApiContext);
  const [error, setError] = useState();
  const { value: host, bind: bindHost } = useInput(
    process.env.REACT_APP_BOBJ_HOST
  );
  const { value: user, bind: bindUser } = useInput(
    process.env.REACT_APP_BOBJ_USER
  );
  const { value: pw, bind: bindPw, reset: resetPw } = useInput(
    process.env.REACT_APP_BOBJ_PW
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://" + host + ":6405/biprws/";
    bobjLogin(url, user, pw, "secEnterprise")
      .then((token) => {
        setApi(url, token);
        resetPw();
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form>
        <input id="name" type="text" placeholder="cms.local" {...bindHost} />
        <input id="code" type="text" placeholder="user" {...bindUser} />
        <input
          id="password"
          type="password"
          placeholder="password"
          {...bindPw}
        />
        <button onClick={handleSubmit} type="button">
          Connect
        </button>
      </form>
    </div>
  );
};

export default Login;
