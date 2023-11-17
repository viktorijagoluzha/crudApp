import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik, FormikContext, useFormikContext} from 'formik';
import * as yup from 'yup';
import CustomButton from './CustomButton';
import {BLACK_WITH_OPACITY, PRIMARY, RED, WHITE} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {loginUser} from '../features/authenticationSlice';
import {PasswordInput, TextInput2} from './CustomInput';
import Title from './Title';

interface LoginFormProps {
  dispatchLogin: (username: string, password: string) => void;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
});

const LoginForm: React.FC<LoginFormProps> = ({dispatchLogin}) => {
  const navigation = useNavigation<any>();
  const [inputColor, setInputColor] = useState(false);
  const formikRef = useRef<any>(null);

  const handleLogin = async (values: {username: string; password: string}) => {
    try {
      await validationSchema.validate(values);
      dispatchLogin(values.username, values.password);
      navigation.navigate('Home');

      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
      innerRef={formikRef}>
      {({handleChange, values, errors}) => (
        <View>
          <View style={styles.textInput}>
            <Title
              size="sm"
              data={'Enter your username'}
              style={{marginLeft: 8}}
            />
            <TextInput2
              placeholder={'admin@admin.com'}
              backgroundColor={WHITE}
              placeholderTextColor={BLACK_WITH_OPACITY}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="username"
              onChangeText={handleChange('username')}
              defaultValue={values.username}
              onFocus={() => setInputColor(true)}
              onEndEditing={() => setInputColor(false)}
              marginTop={2}
            />
            {errors.username && (
              <Title data={errors.username} color="red" marginBottom={10} />
            )}
          </View>
          <View style={styles.textInput}>
            <Title
              size="sm"
              data={'Enter your password'}
              style={{marginTop: 8, marginLeft: 8}}
            />
            <PasswordInput
              autoCapitalize="none"
              secureTextEntry={true}
              backgroundColor={WHITE}
              placeholder={'123456'}
              textContentType={'oneTimeCode'}
              value={values.password}
              onChangeText={handleChange('password')}
              style={{
                justifyContent: 'center',
              }}
            />
            {errors.password && (
              <Title data={errors.password} color="red" marginBottom={10} />
            )}
          </View>
          <CustomButton
            title={'Login'}
            onPress={() => {
              handleLogin(values);
            }}
            width={300}
            marginTop={40}
            backgroundColor={PRIMARY}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    width: '100%',
    height: 48,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    color: RED,
    marginBottom: 10,
  },
});

const mapDispatchToProps = (
  dispatch: (arg0: {payload: any; type: 'authentication/loginUser'}) => any,
) => ({
  dispatchLogin: (username: any, password: any) =>
    dispatch(loginUser({username, password})),
});
export default connect(null, mapDispatchToProps)(LoginForm);
