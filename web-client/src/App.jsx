import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <ModalsProvider>
        <div className="App">
          <MainRoutes />
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
