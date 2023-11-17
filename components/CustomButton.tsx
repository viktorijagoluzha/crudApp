import React from 'react';
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Title from './Title';

interface CustomButtonProps {
  title: string;
  showIcon?: boolean;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  height?: 'big' | 'small';
  width?: number | string | null;
  marginTop?: number | null;
  marginBottom?: number | null;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  showIcon = false,
  onPress,
  disabled = false,
  backgroundColor = 'blue',
  height = 'big',
  width = null,
  marginBottom,
  marginTop 
}) => {
  const textSize = height === 'big' ? 'md' : 'sm';
  const fontFamily = height === 'big' ? 'bold' : 'medium';

  const containerStyle: ViewStyle = width
    ? {
        width: width as DimensionValue | undefined,
        height: height === 'big' ? 41 : 32,
        backgroundColor: disabled ? 'grey' : backgroundColor,
        borderRadius: 40,
        marginTop: marginTop ?? null,
        marginBottom: marginBottom ?? null,
      }
    : {
        height: height === 'big' ? 41 : 32,
        paddingHorizontal: 24,
        backgroundColor: disabled ? 'grey' : backgroundColor,
        borderRadius: 40,
        width: width as DimensionValue,
        marginTop: marginTop ?? null,
        marginBottom: marginBottom ?? null,
      };
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.contaner}>
      <View style={[styles.textWrapper, containerStyle]}>
        <Title
          size={textSize}
          fontStyle={fontFamily}
          align="center"
          color={
            backgroundColor === 'white' || backgroundColor === '#FFFFFF'
              ? 'blue'
              : 'white'
          }
          style={{marginRight: showIcon ? 12 : 0}}
          data={title}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  contaner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
