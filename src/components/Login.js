import { useContext, useState } from "react";
import { useInput } from "../hooks/input";

import { ApiContext } from "../providers/ApiProvider";
import { bobjLogin } from "../api/login";
import ReactGA from "react-ga";

const Login = () => {
  const { setApi } = useContext(ApiContext);
  const [error, setError] = useState();
  const { value: url, bind: bindUrl } = useInput(
    process.env.REACT_APP_BOBJ_URL || `http://bobj-server:6405/biprws/`
  );
  const { value: user, bind: bindUser } = useInput(
    process.env.REACT_APP_BOBJ_USER || `Administrator`
  );
  const {
    value: pw,
    bind: bindPw,
    reset: resetPw,
  } = useInput(process.env.REACT_APP_BOBJ_PW);

  const handleSubmit = (event) => {
    event.preventDefault();
    bobjLogin(url, user, pw, "secEnterprise")
      .then((token) => {
        setApi(url, token);
        resetPw();
        setError(null);
        ReactGA.event({
          category: "Login",
          action: "Success",
        });
      })
      .catch((err) => {
        setError(err.message);
        ReactGA.event({
          category: "Login",
          action: "Failed login",
        });
      });
  };

  return (
    <div className="p-2">
      {error && <div>{error}</div>}
      <form className="space-x-2">
        <input
          className="shadow appearance-none border rounded  py-2 px-3 w-3/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="http://bobj-server:6405/biprws/"
          {...bindUrl}
        />
        <input
          className="shadow appearance-none border rounded  py-2 px-3  w-3/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="code"
          type="text"
          placeholder="user"
          {...bindUser}
        />
        <input
          className="shadow appearance-none border rounded  py-2 px-3 w-3/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="password"
          {...bindPw}
        />
        <button
          className="bg-gray-200 light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleSubmit}
        >
          Connect
        </button>
      </form>
    </div>
  );
};

export default Login;
