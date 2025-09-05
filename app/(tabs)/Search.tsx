import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchTerm,
      }),
    false,
  );

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(searchDebounce);
  }, [searchTerm]);

  useEffect(() => {
    if (movies?.length && movies?.[0]) {
      updateSearchCount(searchTerm, movies?.[0] as Movie);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 flex-1 w-full" resizeMode="cover" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movieData={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-center w-full mt-20">
              <Image source={icons.logo} className="w-12 h-10" resizeMode="contain" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchTerm}
                onChangeText={(text: string) => setSearchTerm(text)}
              />

              {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

              {error && (
                <Text className="self-center mt-10 text-lg text-red-500">
                  Error: {error.message}
                </Text>
              )}

              {!loading && !error && searchTerm.trim() && movies?.length > 0 && (
                <Text className="mt-2 text-xl font-bold text-white">
                  Search Results for{' '}
                  <Text className="text-xl font-bold text-blue-400">{searchTerm}</Text>
                </Text>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-gray-500">
                {searchTerm.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
