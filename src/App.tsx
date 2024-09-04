import "./App.sass";
import { Columns } from "./components/Board/Columns";
import { PopUp } from "./components/PopUp/PopUp";
import { BoardProvider } from "./components/Provider/BoardProvirder";

function App() {
    return (
        <main className="App">
            <BoardProvider>
                <PopUp />
                <Columns />
            </BoardProvider>
        </main>
    );
}

export default App;
