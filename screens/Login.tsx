import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import LoginForm from '../components/LoginForm';
import EditAvatarPicture from '../components/EditAvatarPicture';

const Login: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditAvatarPicture disabled={true} showTitle={false} />
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flexDirection: 'column',
  },
});

export default Login;
