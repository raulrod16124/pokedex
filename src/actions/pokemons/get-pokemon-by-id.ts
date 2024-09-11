import { pokeApi } from "../../config/api/pokeApi"
import type { Pokemon } from "../../domain/entities/pokemon"
import type { PokeApiPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces"
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper"

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    try{
        const { data } = await pokeApi.get<PokeApiPokemon>(`/pokemon/${id}`)
        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

        return pokemon;
    } catch(error){
        throw new Error(`Error getting pokemon by id: ${id}`)
    }
}