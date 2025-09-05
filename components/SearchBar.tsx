import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';
interface Props {
  onPress?: () => void;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}
const SearchBar = ({ onPress, onChangeText, value, placeholder }: Props) => {
  return (
    <View className="flex-row items-center px-5 py-4 rounded-full bg-dark-200">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
      <TextInput
        className="flex-1 ml-2 text-white"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default SearchBar;
