import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: '',
    }),
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="self-center mt-10" />
        ) : moviesError || trendingError ? (
          <Text className="self-center mt-10 text-lg text-red-500">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar onPress={() => router.push('/Search')} placeholder="Search for a movie" />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="mb-3 text-lg font-bold text-white">Trending Movies</Text>
              </View>
            )}

            <FlatList
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard
                  movie_id={item.movie_id}
                  poster_url={item.poster_url}
                  index={index}
                  title={item.title}
                />
              )}
              horizontal
              ItemSeparatorComponent={() => <View className="w-5" />}
              showsHorizontalScrollIndicator={false}
              className="mb-5"
              keyExtractor={(item) => item.movie_id.toString()}
              contentContainerStyle={{
                gap: 20,
                paddingRight: 5,
              }}
            />

            <>
              <Text className="mt-5 mb-3 text-lg font-bold text-white">Latest Movies</Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movieData={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="pb-32 mt-2"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
