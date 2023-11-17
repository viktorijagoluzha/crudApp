import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {updateUsername, updatePassword} from '../features/authenticationSlice';
import Title from '../components/Title';
import EditAvatarPicture from '../components/EditAvatarPicture';
import CustomButton from '../components/CustomButton';
import {BLACK_WITH_OPACITY, PRIMARY, WHITE} from '../styles/colors';
import {PasswordInput, TextInput2} from '../components/CustomInput';

interface MyProfileProps {
  user: {username: string; password: string};
  dispatchUpdateUsername: (username: string) => void;
  dispatchUpdatePassword: (password: string) => void;
  navigation: any;
}

const MyProfile: React.FC<MyProfileProps> = ({
  user,
  dispatchUpdateUsername,
  dispatchUpdatePassword,
  navigation,
}) => {
  const handleSaveChanges = (values: any) => {
    dispatchUpdateUsername(values.editableUsername);
    dispatchUpdatePassword(values.editablePassword);
    navigation.navigate('Home');
  };
  const [inputColor, setInputColor] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditAvatarPicture disabled={false} showTitle={true} />

        <Formik
          initialValues={{
            editableUsername: user.username,
            editablePassword: user.password,
          }}
          onSubmit={handleSaveChanges}>
          {({handleChange, values, errors}) => (
            <>
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
                  value={values.editableUsername}
                  onChangeText={handleChange('editableUsername')}
                  onFocus={() => setInputColor(true)}
                  onEndEditing={() => setInputColor(false)}
                  marginTop={2}
                />
                {errors.editableUsername && (
                  <Title
                    data={errors.editableUsername}
                    color="red"
                    marginBottom={10}
                  />
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
                  value={values.editablePassword}
                  onChangeText={handleChange('editablePassword')}
                  style={{
                    justifyContent: 'center',
                  }}
                />
                {errors.editablePassword && (
                  <Title
                    data={errors.editablePassword}
                    color="red"
                    marginBottom={10}
                  />
                )}
              </View>

              <CustomButton
                title={'Save Changes'}
                onPress={() => handleSaveChanges(values)}
                width={300}
                backgroundColor={PRIMARY}
                marginTop={40}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputField: {
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 16,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
  },
});

const mapStateToProps = (state: {auth: {user: any}}) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchUpdateUsername: (username: string) =>
    dispatch(updateUsername(username)),
  dispatchUpdatePassword: (password: string) =>
    dispatch(updatePassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
