import { useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import globals from "./modules/globals";
import "./App.css";
import "./components/layout/layout.css";
import { useMediaQuery } from "@mui/material";
import useTranslations from "./hooks/useTranslations";
import Loader from "./components/common/Loader";
import { initApplication } from "./modules/Application";


function App() {
  const [isHandheld, setIsHandheld] = useState(
    useMediaQuery("(max-width:630px)")
  );
  const [isLoading, setLoading] = useState(true);

  const { t } = useTranslations();
  useEffect(() => {
    if (window) {
      window.addEventListener("resize", () => {
        const { isMobile } = globals();
        setIsHandheld(isMobile);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);
  useEffect(() => {
    if (isLoading) {
      initApplication(() => {
        setLoading(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="App" data-testid={t("task_manager")}>
      <div className="layout">
        <AppLayout isHandheld={isHandheld} />
      </div>
    </div>
  );
}

export default App;
