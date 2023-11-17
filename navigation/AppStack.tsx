import React, {useRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import Home from '../screens/Home';
import MyProfile from '../screens/MyProfile';
import {connect} from 'react-redux';
import {logoutUser} from '../features/authenticationSlice';
import { Dispatch } from '@reduxjs/toolkit';

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  dispatchLogout: () => void;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  dispatchLogout,
  ...props
}) => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    console.log('Logging out...');
    dispatchLogout();
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="MyProfile"
        onPress={() => props.navigation.navigate('MyProfile')}
      />
      <View style={{marginTop: 40 * 16}}>
        <CustomButton title={'Logout'} onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
};
interface AppStackProps {
  dispatchLogout: () => void;
}

const AppStack: React.FC<AppStackProps> = ({dispatchLogout}) => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent dispatchLogout={dispatchLogout} {...props} />
      )}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: 'Home',
          headerRight: () => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 12,
              }}
              onPress={() => {
                navigation.navigate('CreatePost');
              }}>
              <Image
                source={require('../assets/icons/plus.png')}
                style={{width: 24, height: 24, tintColor: '#333'}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="MyProfile"
        component={MyProfile}
        options={() => ({
          title: 'MyProfile',
          header: () => <CustomHeader title="MyProfile" />,
        })}
      />
    </Drawer.Navigator>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchLogout: () => dispatch(logoutUser()),
});
export default connect(null, mapDispatchToProps)(AppStack);
