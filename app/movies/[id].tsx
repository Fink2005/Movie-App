import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
interface MovieInfoProps {
  label: string;
  value: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="my-2">
    <Text className="text-sm text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">{value !== null ? value : 'N/A'}</Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
  const router = useRouter();

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-primary">
        <Text className="text-lg font-bold text-white">Loading...</Text>
      </View>
    );
  } else if (!movie) {
    return (
      <View className="items-center justify-center flex-1 bg-primary">
        <Text className="text-lg font-bold text-white">Movie not found</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }}
          />
        </View>
        <View className="flex-col items-start justify-center px-5 mt-5">
          <Text className="text-xl font-bold text-white">{movie.title}</Text>

          <View className="flex-row">
            <Text className="my-1 text-base font-medium text-light-200">
              {movie.release_date.split('-')[0]}
            </Text>
            <Text className="my-1 text-base font-medium ms-2 text-light-200">{movie.runtime}m</Text>
          </View>

          <View className="flex-row items-center justify-start px-2 py-1 rounded-md gap-x-1 bg-dark-100">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-gray-300 uppercase ms-1">
              {Math.round(movie.vote_average)}/10
            </Text>
            <Text className="text-sm text-light-200">({movie.vote_count} votes)</Text>
          </View>
          <MovieInfo label="Overview" value={movie.overview} />
          <MovieInfo label="Genres" value={movie.genres.map((genre) => genre.name).join(', ')} />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${movie.budget / 1_000_000} million`} />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie.revenue / 1_000_000)} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie.production_companies.map((company) => company.name).join(', ')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={() => router.back()}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
        <Text className="text-base font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
