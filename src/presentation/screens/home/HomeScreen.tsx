import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getPokemons } from '../../../actions/pokemons/get-pokemons'
import { PokeballBg } from '../../components/ui/PokeballBg'
import { FAB, Text, useTheme } from 'react-native-paper'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigator/StackNavigator'
import Icon from "react-native-vector-icons/Ionicons"

interface IProps extends StackScreenProps<RootStackParams, "HomeScreen"> {}

export const HomeScreen = ({ navigation }: IProps) => {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();

  // Traditional way to do a http query:
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ["pokemons"],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 1 hour
  // })

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam)
      pokemons.forEach( pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      })
      return pokemons;
    },
    getNextPageParam: ( lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      
      <FlatList 
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={() => (
          <Text variant='displayMedium' style={styles.text}>Pokédex</Text>
        )}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={ 0.6 }
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
      <FAB 
        icon={() => <Icon name="search-outline" size={25} color={theme.dark ? "black" : "white"} />}
        style={[ globalTheme.fab, { backgroundColor: theme.colors.primary}]}
        mode='elevated'
        onPress={() => navigation.push("SearchScreen")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: "absolute",
    top: -100,
    right: -100
  },
  text:{
    fontFamily: "LuckiestGuy-Regular"
  }
})