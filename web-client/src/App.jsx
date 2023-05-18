import "./App.css";
import { CakeView } from "./features/cake/CakeView";
import { IceCreamView } from "./features/ice-cream/IceCreamView";
import { UserView } from "./features/user/UserView";

function App() {
  return (
    <div>
      <CakeView />
      <IceCreamView />
      <UserView />
    </div>
  );
}

export default App;