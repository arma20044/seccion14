import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/Navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ( { navigation, route }: Props ) => {

  const { simplePokemon, color } = route.params;
  const { top } = useSafeAreaInsets();
  const { id, name, picture } = simplePokemon;

  const { isLoading, pokemon } = usePokemon( id );

  

  return (
    <View style={{ flex: 1}}>
        {/* Header Container */}
        <View style={{
          ...styles.headerContainer,
              backgroundColor: color,
        }}>

          {/* Backbutton */}
          <TouchableOpacity
            onPress={ () => navigation.pop()}
            activeOpacity={0.8}
            style={{
              ...styles.backBotton,
              top: top + 5,
              
            }}
          >

              <Icon
                  name='arrow-back-outline'
                  color='white'
                  size={30}
              />

          </TouchableOpacity>

           {/* Nombre del Pokemon */}
           <Text style={{
             ...styles.pokemonName,
             top: top + 40
           }}>
            { name + '\n' } #{id}
           </Text>

           {/*pokebola blanca */}
           <Image
            source={ require('../assets/pokebola-blanca.png')}
            style={ styles.pokebola}
           />

           <FadeInImage
            uri= { picture }
            style={ styles.pokemonImage}
           />


        </View>


           {/* Detalles  y Loading */}
           {
             isLoading 
             ? (

                <View style={ 
             styles.activityIndicator
             }>
             <ActivityIndicator
                color={ color }
                size={ 50 }
             />
           </View>

             )
             : <PokemonDetails  pokemon={ pokemon }/>
           }
         

             
        

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backBotton: {
    position: 'absolute',
    left: 35
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:1000,
    height:1000
   // paddingTop: 60
  }
})