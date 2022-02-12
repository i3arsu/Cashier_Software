import "./App.css";
import { ItemList } from "./ItemList";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Half-section">
          <div className="Box">Cart</div>
          <div className="Box">Buttons</div>
          <div className="Box">Calculator</div>
        </div>
        <div className="Half-section">
          <div className="Box Items-box">
            <ItemList />
          </div>
          <div className="Box">Search Bar</div>
        </div>
      </header>
    </div>
  );
};
