import "./App.sass";
import { Board } from "./components/Board/Board";
import { LoginPopUp } from "./components/LoginPopUp/LoginPopUp";
import { BoardProvider } from "./app/providers/BoardProvirder";

const App: React.FC = () => {
    return (
        <main className="app">
            <BoardProvider>
                <LoginPopUp />
                <Board />
            </BoardProvider>
        </main>
    );
};

export default App;
