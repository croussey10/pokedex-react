export interface PokemonInfos {
    id: number,
    name: string,
    sprites: {
        front_default: string
    }
    cries: {
        latest: string
    }
    stats: {
        stat: {
            name: string
        };
        base_stat: number
    }[]
}