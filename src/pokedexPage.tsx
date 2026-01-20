import {Link} from "react-router";

export function Pokedex() {

    const pokemon = "bulbasaur";

    return (
        <>
            <h1>pokedex page</h1>
            <Link to={`/pokemon/${pokemon}`}>
                <button>pokemon</button>
            </Link>
        </>
    )
}