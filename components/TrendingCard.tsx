import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const TrendingCard = ({
  movie_id,
  poster_url,
  index,
}: {
  movie_id: number;
  poster_url: string;
  index: number;
}) => {
  return (
    <Link href={`/movie/${movie_id}` as any} asChild>
      <TouchableOpacity className="relative w-32 pl-5">
        <Image source={{ uri: poster_url }} className="w-32 h-48 rounded-lg" resizeMode="cover" />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1">
          <MaskedView
            maskElement={<Text className="text-6xl font-bold text-white ">{index + 1}</Text>}
          >
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
