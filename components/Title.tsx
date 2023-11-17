import React, {ReactNode} from 'react';
import {Text, TextStyle} from 'react-native';
import {
  BLACK,
  DARKGRAY,
  GRAY,
  NEW_BLUE,
  NEW_GREEN,
  ORANGE,
  PRIMARY,
  RED,
  WHITE,
} from '../styles/colors';
import {
  ROBOTO_BOLD,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  ROBOTO_SLAB_SEMIBOLD,
} from '../styles/fonts';

interface TitleProps {
  size?:
    | 'xxxl'
    | 'xlg'
    | 'xxl'
    | 'xl'
    | 'lg'
    | 'md'
    | 'customMd'
    | 'sm'
    | 'xs'
    | 'xxs'
    | 'xxxs';
  color?:
    | 'orange'
    | 'gray'
    | 'darkGray'
    | 'red'
    | 'white'
    | 'violet'
    | 'green'
    | 'blue';
  lineHeight?: number;
  fontStyle?: 'semibold' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
  width?: number | null;
  marginRight?: number | null;
  marginTop?: number | null;
  marginBottom?: number | null;
  marginLeft?: number | null;
  data: ReactNode | any;
  style?: TextStyle;
  onPress?: () => void;
}

export const Title: React.FC<TitleProps> = ({
  size,
  color,
  lineHeight,
  fontStyle,
  align,
  width,
  marginRight,
  marginBottom,
  marginTop,
  marginLeft,
  data,
  style,
  onPress,
}) => {
  const fontSize = () => {
    switch (size) {
      case 'xxxl':
        return 64;
      case 'xlg':
        return 40;
      case 'xxl':
        return 24;
      case 'xl':
        return 20;
      case 'lg':
        return 18;
      case 'md':
        return 16;
      case 'customMd':
        return 15;
      case 'sm':
        return 13;
      case 'xs':
        return 11;
      case 'xxs':
        return 9;
      case 'xxxs':
        return 7;
      default:
        return 16;
    }
  };

  const fontColor = () => {
    switch (color) {
      case 'orange':
        return ORANGE;
      case 'gray':
        return GRAY;
      case 'darkGray':
        return DARKGRAY;
      case 'red':
        return RED;
      case 'white':
        return WHITE;
      case 'violet':
        return PRIMARY;
      case 'green':
        return NEW_GREEN;
      case 'blue':
        return NEW_BLUE;
      default:
        return BLACK;
    }
  };

  const fontFamily = () => {
    switch (fontStyle) {
      case 'semibold':
        return ROBOTO_SLAB_SEMIBOLD;
      case 'medium':
        return ROBOTO_MEDIUM;
      case 'bold':
        return ROBOTO_BOLD;
      default:
        return ROBOTO_REGULAR;
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: fontSize(),
          color: fontColor(),
          lineHeight: lineHeight ?? 20,
          textAlign: align ?? 'left',
          width: width ?? null,
          marginRight: marginRight ?? null,
          marginTop: marginTop ?? null,
          marginBottom: marginBottom ?? null,
          marginLeft: marginLeft ?? null,
          paddingVertical: 2,
          paddingHorizontal: 0,
          fontFamily: fontFamily(),
        },
        style,
      ]}>
      {data}
    </Text>
  );
};

export default Title;
