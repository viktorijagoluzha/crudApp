import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Title from './Title';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginRight: 10}}>
        <Image
          source={require('../assets/icons/left-arrow.png')}
          style={{width: 24, height: 24, tintColor: '#333'}}
        />
      </TouchableOpacity>
      <Title
        data={title}
        size="xl"
        align="center"
        fontStyle="bold"
        lineHeight={40}
      />
    </View>
  );
};

export default CustomHeader;
