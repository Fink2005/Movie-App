import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({ movieData }: { movieData: Movie }) => {
  return (
    <Link href={`/movie/${movieData.id}` as any} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : 'https/placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full rounded-lg h-52"
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="mt-1 font-bold text-white text-md">
          {movieData.title}
        </Text>
        <View className="flex-row items-center justify-start my-1 gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold text-gray-300 uppercase">
            {Math.round(movieData.vote_average)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-bold text-light-300">
            {movieData.release_date.split('-')[0]}
          </Text>
          <Text className="text-xs font-medium uppercase text-light-300">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
