import React from 'react';
import {Provider} from 'react-redux';
import store from './store/userStore';
import Login from './screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ViewPost from './screens/ViewPost';
import CreatePost from './screens/CreatePost';
import AppStack from './navigation/AppStack';
import CustomHeader from './components/CustomHeader';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={AppStack}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MyProfile"
            component={AppStack}
            options={{
              title: 'My Profile',
              header: () => <CustomHeader title="My Profile" />,
            }}
          />
          <Stack.Screen
            name="ViewPost"
            component={ViewPost as never}
            options={() => ({
              title: 'View Post',
              header: () => <CustomHeader title="View Post" />,
            })}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={() => ({
              title: 'Create Post',
              header: () => <CustomHeader title="Create Post" />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
