import { Provider } from "react-redux";
import store from "./redux/store";
import AppProvider from "./AppProvider";

function App() {
  return (
    <Provider store={store}>
      <AppProvider />
    </Provider>
  );
}

export default App;
