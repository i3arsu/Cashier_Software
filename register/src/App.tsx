import "./App.css";
import { ItemList } from "./ItemList";
import { CartList } from "./CartList";
import { ButtonList } from "./ButtonList";
import { Total } from "./Total";
import { CategoriesList } from "./CategoriesList";
import { Search } from "./Search";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Half-section Cart-section">
          <div className="Box Cart-box">
            <CartList />
          </div>
          <div className="Box Buttons-box">
            <ButtonList />
          </div>
          <div className="Box Total-box">
            <Total />
          </div>
          <div className="Box Box-title">Quick Stats</div>
        </div>
        <div className="Half-section Item-section">
          <div className="Box Buttons-box">
            <CategoriesList />
          </div>
          <div className="Box Total-box">
            <Search />
          </div>
          <div className="Box Items-box">
            <ItemList />
          </div>
        </div>
      </header>
    </div>
  );
};
