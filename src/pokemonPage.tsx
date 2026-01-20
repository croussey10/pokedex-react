import {Link, useParams} from "react-router";
import type {PokemonInfos} from "./types/interfaces.tsx";

export function Pokemon() {

    const { name } = useParams();

    async function pokemonInfos (name: string) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        console.log(data);
    }

    pokemonInfos(name!);

    return (
        <>
            <h1>{name} page</h1>
            <Link to="/">
                <button>home</button>
            </Link>
        </>
    )
}