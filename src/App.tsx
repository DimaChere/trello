import "./App.sass";
import { Board } from "./components/Board/Board";
import { PopUp } from "./components/PopUp/PopUp";
import { BoardProvider } from "./app/providers/BoardProvirder";

const App: React.FC = () => {
    return (
        <main className="app">
            <BoardProvider>
                <PopUp />
                <Board />
            </BoardProvider>
        </main>
    );
};

export default App;
