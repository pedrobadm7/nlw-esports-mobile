import { Home } from '../screens/Home';
import { Game } from '../screens/Game';
import { Login } from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '../context/AppGlobal';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { auth } = useAuthContext()

  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {auth.accessToken ?
        <>
          <Screen
            name='home'
            component={Home}
          />
          <Screen
            name='game'
            component={Game}
          />
        </>
        :
        <Screen
          name='login'
          component={Login}
        />}
    </Navigator>
  )
}
