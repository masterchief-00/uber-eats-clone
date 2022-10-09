import Navigation from "./Navigation";
import { Provider } from "react-redux";
import configureStore from "./redux/store";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
