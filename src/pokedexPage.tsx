import {Link} from "react-router";
import type {PokemonInfos, PokemonResource} from "./types/interfaces.tsx";
import {useEffect, useState} from "react";

export function Pokedex() {

    const pokemon = "bulbasaur";
    const [offset, setOffset] = useState(0);
    const [listPokemonsPagination, setListPokemonsPagination] = useState<string[]>();
    const POKEMON_LIST_CACHE = "pokemonListCache";
    const [pokemonListParse, setPokemonListParse] = useState([]);

    const fetchAllPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1400`);
        const data: PokemonResource = await response.json();

        const simplifiedPokemons = data.results.map((pokemon) => ({
            name: pokemon.name,
            id: pokemon.url.split("/").filter(Boolean).pop()
        }));

        localStorage.setItem(POKEMON_LIST_CACHE, JSON.stringify(simplifiedPokemons));
        setPokemonListParse(JSON.parse(localStorage.getItem(POKEMON_LIST_CACHE)!));
    }

    if (!localStorage.getItem(POKEMON_LIST_CACHE)) {
        void fetchAllPokemons();
    }

    useEffect(() => {
        console.log(pokemonListParse)
        console.log(pokemonListParse.slice(offset, 20 + offset));
    }, [offset, pokemonListParse]);

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

    useEffect(() => {
        const fetchListPokemons = async () => {
            if (!listPokemonsPagination) {
                return;
            }
            const promises = listPokemonsPagination.map(async (name) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                return response.json();
            });
            const fullPokemonsData = await Promise.all(promises);
            console.log(fullPokemonsData);
        }
        void fetchListPokemons()
    }, [listPokemonsPagination]);

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