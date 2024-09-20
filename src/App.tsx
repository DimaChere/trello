import "./App.sass";
import { Board } from "./components/Board/Board";
import { LoginPopUp } from "./components/LoginPopUp/LoginPopUp";

const App: React.FC = () => {
    return (
        <main className="app">
            <LoginPopUp />
            <Board />
        </main>
    );
};

export default App;
