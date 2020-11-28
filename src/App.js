import Application from "./components/Application";
import ApiProvider from "./providers/ApiProvider";

function App() {
  return (
    <ApiProvider>
      <Application />
    </ApiProvider>
  );
}

export default App;
