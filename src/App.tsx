import { HashRouter as Router, Routes, Route } from "react-router";
import {Pokedex} from "./pokedexPage.tsx";
import {Pokemon} from "./pokemonPage.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Pokedex />} />
                <Route path="/pokemon/:name" element={<Pokemon />}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default App
