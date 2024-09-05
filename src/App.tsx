import "./App.sass";
import { Columns } from "./components/Board/Columns";
import { PopUp } from "./components/PopUp/PopUp";
import { BoardProvider } from "./app/providers/BoardProvirder";

const App: React.FC = () => {
    return (
        <main className="App">
            <BoardProvider>
                <PopUp />
                <Columns />
            </BoardProvider>
        </main>
    );
};

export default App;
