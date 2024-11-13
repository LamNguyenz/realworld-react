import UserContextProvider from "./context/UserContextProvider";
import Router from "./Router";

function App() {
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  );
}

export default App;
