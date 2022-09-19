import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Image, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';



import { styles } from './styles';
import { Background } from '../../components/Background';
import axios from 'axios';
import { useAuthContext } from '../../context/AppGlobal';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => console.log({ games }), [])

  const { auth } = useAuthContext();

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    async function getGames() {
      try {
        const response = await axios.get('http://192.168.100.7:3333/games', {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });
        setGames(response.data);
      } catch (e) {
        console.log(e)
      }
    }
    getGames()
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>

  );
}
