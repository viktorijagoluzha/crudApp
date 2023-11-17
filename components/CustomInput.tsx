import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ROBOTO_REGULAR} from '../styles/fonts';
import {
  TEXT_FIELD_BG,
  NEW_SHADOW,
  BLACK_WITH_OPACITY,
  NEW_PRIMARY_DARK,
} from '../styles/colors';

interface TextInput2Props extends TextInputProps {
  marginTop?: number;
  backgroundColor?: string;
  inputColor?: string;
}

const TextInput2: React.FC<TextInput2Props> = ({
  marginTop = 16,
  backgroundColor,
  inputColor,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      style={{
        minWidth: 200,
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 15,
        height: 54,
        padding: 16,
        position: 'relative',
        color: BLACK_WITH_OPACITY,
        fontFamily: ROBOTO_REGULAR,
        marginVertical: 12,
        lineHeight: 18,
        zIndex: 24,
        backgroundColor: backgroundColor ?? TEXT_FIELD_BG,
        borderColor: inputColor ? NEW_PRIMARY_DARK : NEW_SHADOW,
        marginTop: marginTop,
      }}
    />
  );
};

interface PasswordInputProps extends TextInputProps {
  onFocus?: () => void;
  onEndEditing?: () => void;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const PasswordInput: React.FC<PasswordInputProps> = (
  {
    onFocus,
    onEndEditing,
    style,
    keyboardType = 'default',
    backgroundColor,
    ...rest
  },
  ref,
) => {
  const [state, setState] = useState({
    icEye: 'visibility-off',
    isPassword: true,
  });
  const [borderColor, setBorderColor] = useState(false);

  return (
    <View style={[style, {justifyContent: 'center'}]}>
      <TextInput
        {...rest}
        ref={ref}
        placeholderTextColor={BLACK_WITH_OPACITY}
        secureTextEntry={state.isPassword}
        onFocus={() => {
          setBorderColor(true);
          onFocus && onFocus();
        }}
        onEndEditing={() => {
          setBorderColor(false);
          onEndEditing && onEndEditing();
        }}
        keyboardType={keyboardType}
        style={{
          minWidth: 200,
          borderWidth: 1,
          borderRadius: 50,
          fontSize: 15,
          height: 54,
          paddingLeft: 16,
          paddingRight: 52,
          position: 'relative',
          color: BLACK_WITH_OPACITY,
          backgroundColor: backgroundColor ?? TEXT_FIELD_BG,
          fontFamily: ROBOTO_REGULAR,
          lineHeight: 18,
          zIndex: 24,
          borderColor: NEW_SHADOW,
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 30,
          elevation: 33,
          right: 16,
        }}>
        <TouchableOpacity
          onPressIn={() =>
            setState({
              icEye: state.isPassword ? 'visibility' : 'visibility-off',
              isPassword: !state.isPassword,
            })
          }>
          {state.icEye === 'visibility' ? (
            <Image
              source={require('../assets/icons/hide.png')}
              style={{width: 30, height: 30, marginHorizontal: 4}}
            />
          ) : (
            <Image
              source={require('../assets/icons/eye.png')}
              style={{width: 30, height: 30, marginHorizontal: 4}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {TextInput2, PasswordInput};
