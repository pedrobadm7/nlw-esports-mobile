import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Game } from '../screens/Game';
import { Login } from '../screens/Login';


const RootStack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

const FeedStack = createNativeStackNavigator();

const AuthStackFlow = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen
        name='login'
        component={Login}
      />
    </AuthStack.Navigator >
  )
}

const FeedStackFlow = () => {
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <FeedStack.Screen
        name='home'
        component={Home}
      />
      <FeedStack.Screen
        name='game'
        component={Game}
      />
    </FeedStack.Navigator>
  )
}

export const RootStackFlow = () => {
  return (
    <RootStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <RootStack.Screen
        name='authFlow'
        component={AuthStackFlow}
      />
      <RootStack.Screen
        name='feedStackFlow'
        component={FeedStackFlow}
      />

    </RootStack.Navigator>
  )
}

