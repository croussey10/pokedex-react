import {Link} from "react-router";

export function Pokedex() {

    // const navigate = useNavigate();
    const pokemon = "bulbasaur";

    // const pokemonName = () => {
    //     const pokemon = "bulbasaur";
    //     navigate(`/pokemon/${pokemon}`)
    // }

    return (
        <>
            <h1>pokedex page</h1>
            <Link to={`/pokemon/${pokemon}`}>
                <button>pokemon</button>
            </Link>
            {/*<button onClick={pokemonName}>*/}
            {/*    pokemon*/}
            {/*</button>*/}
        </>
    )
}