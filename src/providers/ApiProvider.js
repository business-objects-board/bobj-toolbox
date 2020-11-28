import React, { Component, createContext } from "react";

export const ApiContext = createContext();

class ApiProvider extends Component {
  state = {
    url: null,
    token: null,
  };

  //   componentDidMount = async () => {
  //     auth.onAuthStateChanged(async (userAuth) => {
  //       const user = await generateUserDocument(userAuth, { cards: [] });
  //       this.setState({ user });
  //     });
  //   };

  render() {
    let { url, token } = this.state;

    const setApi = (url, token) => {
      this.setState({ url, token });
    };

    return (
      <ApiContext.Provider value={{ url, token, setApi }}>
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}

export default ApiProvider;
