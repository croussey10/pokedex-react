import {Link, useNavigate, useParams} from "react-router";
import {useState, useEffect} from "react";
import type {PokemonInfos} from "./types/interfaces.tsx";

export function Pokemon() {

    const { name } = useParams();
    const [data, setData] = useState<PokemonInfos | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigateNextPokemon = useNavigate();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const result: PokemonInfos = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error("Erreur d'API : ", error);
            } finally {
                setLoading(false);
            }
        }
        void fetchPokemon();
    }, [name]);

    if (loading) {
        return <p>Chargement des données de {name}...</p>
    }

    if (!data) {
        return <p>Le Pokémon "{name}" n'a pas pu être trouvé</p>
    }

    const nextPokemon = () => {
        const idCurrentPokemon = data.id;
        const idNextPokemon = idCurrentPokemon + 1;
        const fetchNextPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNextPokemon}`);
            if (response.ok) {
                const result: PokemonInfos = await response.json();
                navigateNextPokemon(`/pokemon/${result.name}`)
            }
        }
        void fetchNextPokemon()
    }

    const previousPokemon = () => {
        const idCurrentPokemon = data.id;
        const idPreviousPokemon = idCurrentPokemon - 1;
        const fetchPreviousPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPreviousPokemon}`);
            if (response.ok) {
                const result: PokemonInfos = await response.json();
                navigateNextPokemon(`/pokemon/${result.name}`)
            }
        }
        void fetchPreviousPokemon()
    }

    const playCry = () => {
        const audio = new Audio(data.cries.latest);
        audio.volume = 0.5;
        void audio.play()
    }

    return (
        <>
            <h1>{data.name}</h1>
            <div>ID : {data.id}</div>
            <img src={data.sprites.front_default} alt={`sprite-${data.name}`}/>
            <button onClick={playCry}>
                Play audio ▶
            </button>
            {data.stats.map((stat) => (
                <div key={stat.stat.name}>
                    <div>{stat.stat.name} : {stat.base_stat}</div>
                    <div style={{
                        width: '100%',
                        backgroundColor: 'red'
                    }}>
                        <div style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                            backgroundColor: 'green',
                            height: '10px'
                        }} />
                    </div>
                </div>
            ))}
            <Link to="/">
                <button>home</button>
            </Link>
            <button onClick={previousPokemon}>
                previous pokemon
            </button>
            <button onClick={nextPokemon}>
                next pokemon
            </button>
            <button onClick={void navigator.clipboard.writeText(`http://localhost:5173/#/pokemon/${name}`)}>
                copy link
            </button>
        </>
    )
}