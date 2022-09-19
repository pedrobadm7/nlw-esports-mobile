import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface AuthContextData {
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  auth: Auth;
}

interface Auth {
  accessToken: string;
  refreshToken: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({} as Auth);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorageData() {
      const storagedAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const storagedRefreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');

      if (storagedAccessToken && storagedRefreshToken) {
        setAuth({ accessToken: storagedAccessToken, refreshToken: storagedRefreshToken })
      }
    }

    loadStorageData();
  }, [auth]);

  async function logIn(email: string, password: string) {
    try {
      const response = await axios.post<Auth>('http://localhost:3333/login', {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      setAuth({
        accessToken,
        refreshToken,
      });

      await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
      await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken);

      navigation.navigate('home');

    } catch (e) {
      console.log(e)
    }
  }

  async function logOut() {
    await AsyncStorage.clear();
    setAuth({
      accessToken: '',
      refreshToken: ''
    });
    navigation.navigate('login')
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut, auth }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
