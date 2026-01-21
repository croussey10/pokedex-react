import {Link} from "react-router";
// import {Pokemon} from "./pokemonPage.tsx";
import type {PokemonResource} from "./types/interfaces.tsx";
import {useEffect, useState} from "react";

export function Pokedex() {

    const pokemon = "bulbasaur";
    const [offset, setOffset] = useState(0);
    const [listPokemonsPagination, setListPokemonsPagination] = useState<string[]>();

    useEffect(() => {
        const listPokemons = async () => {
            console.log(offset);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
            const result: PokemonResource = await response.json();
            const names = result.results.map((pokemon) => pokemon.name);
            setListPokemonsPagination(names);
        }
        void listPokemons();
    }, [offset]);

    console.log(listPokemonsPagination);

    const nextPage = () => {
        setOffset(offset + 20)
    };
    const previousPage = () => {
        if (offset > 0) {
            setOffset(offset - 20)
        }
    };

    return (
        <>
            <h1>pokedex page</h1>
            <Link to={`/pokemon/${pokemon}`}>
                <button>pokemon</button>
            </Link>
            <button onClick={previousPage}>
                previous
            </button>
            <button onClick={nextPage}>
                next
            </button>
        </>
    )
}