import { View, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { PokemonCard } from '../../components/pokemons/PokemonCard'
import { useQuery } from '@tanstack/react-query'
import { getPokemonNamesWithId } from '../../../actions/pokemons/get-pokemon-names-with-id'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { getPokemonsByIds } from '../../../actions/pokemons/get-pokemons-by-ids'
import { useDebounceValue } from '../../hooks/useDebounceValue'

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets()
  const [term, setTerm] = useState("");
  const debounceValue = useDebounceValue(term);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ["pokemons", "all"],
    queryFn: () => getPokemonNamesWithId()
  })

  // TODO: Implement debounce
  const pokemonNameIdList = useMemo(() => {
    // if is a number
    if(!isNaN(Number(debounceValue))){
      const pokemon = pokemonNameList
        .find( pokemon => pokemon.id === Number(debounceValue))
        return pokemon ? [pokemon] : [];
    }

    if(debounceValue.length === 0 || debounceValue.length < 3) return [];

    return pokemonNameList.filter( pokemon => 
        pokemon.name.includes(debounceValue.toLowerCase()))
  }, [debounceValue])

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ["pokemons", "by", pokemonNameIdList],
    queryFn: () => getPokemonsByIds(
      pokemonNameIdList.map( pokemon => pokemon.id)
    ),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  if(isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
      <TextInput 
        placeholder='Search Pokémon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={ value => setTerm(value)}
        value={term}
      />

      { isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}
      
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ height: 150}} />
        }
      />
    </View>
  )
}