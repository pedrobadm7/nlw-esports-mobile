import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../../components/Background';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';
import { GameController } from 'phosphor-react-native';
import { useAuthContext } from '../../context/AppGlobal';



export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)


  const { logIn } = useAuthContext();

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <View style={styles.loginBox}>
          <Text style={styles.title}>
            Login
          </Text>
          <Text style={styles.email}>
            Email
          </Text>

          <TextInput
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            style={[styles.emailInput, { borderColor: isEmailFocused ? THEME.COLORS.PRIMARY : 'transparent' }]}
            value={email}
            onChangeText={setEmail}
            placeholder='pedro@email.com'
            placeholderTextColor={THEME.COLORS.CAPTION_500}
          />

          <Text style={styles.password}>
            Senha
          </Text>

          <TextInput
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            style={[styles.passwordInput, { borderColor: isPasswordFocused ? THEME.COLORS.PRIMARY : 'transparent' }]}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder='Escreva sua senha'
            placeholderTextColor={THEME.COLORS.CAPTION_500}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logIn(email, password)
            }}
            activeOpacity={0.5}
          >
            <GameController
              color={THEME.COLORS.TEXT}
              size={20}
            />
            <Text style={styles.buttonTitle}>
              Conectar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>

  );
}
