import { NavigationContainer } from '@react-navigation/native';

import { RootStackFlow } from './app.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <RootStackFlow />
    </NavigationContainer>
  )
}
