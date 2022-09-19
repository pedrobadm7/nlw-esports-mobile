;
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';
import axios from 'axios';
import { useAuthContext } from '../../context/AppGlobal';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation();
  const route = useRoute();
  const { auth } = useAuthContext();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    try {
      const response = await axios.get(`http://192.168.100.7:3333/ads/${adsId}/discord`, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      })
      setDiscordDuoSelected(response.data.discord)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://192.168.100.7:3333/games/${game.id}/ads`, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        })
        setDuos(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    getData();
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[!!duos.length ? styles.contentList : styles.emptyListContent]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>

  );
}
