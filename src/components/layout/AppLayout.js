import { Provider } from "react-redux";
import AppBoard from "./board/AppBoard";
import AppDrawer from "./drawer/AppDrawer";
import { store } from "../../modules/store";

function AppLayout({ isHandheld }) {
  return (
    <Provider store={store}>
      <AppDrawer isHandheld={isHandheld} />
      <AppBoard />
    </Provider>
  );
}

export default AppLayout;
