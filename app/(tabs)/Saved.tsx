import { icons } from '@/constants/icons';
import React from 'react';
import { Image, View } from 'react-native';

const Saved = () => {
  return (
    <View className="flex-1 bg-primary">
      <View className="flex-col items-center justify-center flex-1 gap-5">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
      </View>
    </View>
  );
};

export default Saved;
