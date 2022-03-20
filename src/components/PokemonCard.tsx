import React from 'react'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors' 
import { useNavigation } from '@react-navigation/native';


const windowWith = Dimensions.get('window').width;

interface Porps {
        pokemon: SimplePokemon;
}

export const PokemonCard = ( { pokemon }: Porps ) => {

    const [bgColor, setBgColor] = useState('grey')
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect(() => {
      ImageColors.getColors( pokemon.picture , { fallback: 'grey' })
        .then( (colors: any) => {

            if( !isMounted.current ) return;

          /*  if( colors.platform === 'android' ){
                setBgColor( colors.dominant || 'grey')
            } else if ( colors.platform === 'ios' ){
                setBgColor( colors.background || 'grey')
            }   */
            ( colors.platform === 'android' )
            ? setBgColor( colors.dominant || 'grey')
            : setBgColor( colors.background || 'grey')

        })

        return () => {
            isMounted.current = false;
        }
    
    }, [])
    



  return (
    <TouchableOpacity
        activeOpacity={ 0.9 }
        onPress={ 
            () => navigation.navigate("PokemonScreen", {
                 simplePokemon: pokemon,
                 color: bgColor
                 })}>
        <View style={{
                ...style.cardContainer,
                width: windowWith * 0.4,
                backgroundColor: bgColor
        }}>

            {/*  Nombre del Pokemon e ID  */}
            <View>
                <Text style={ style.name } >
                    { pokemon.name }
                    { '\n#' + pokemon.id }
                </Text>

            </View>

            <View style={ style.pokebolaContainer}>
                <Image
                    source={ require('../assets/pokebola-blanca.png')}
                    style={ style.pokebola }
                />
            </View>
            <FadeInImage
                uri={ pokemon.picture }
                style={ style.pokemonImage }
            ></FadeInImage>

        </View>


    </TouchableOpacity>
  )
}


const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        //backgroundColor: 'red',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25 
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden'
    }
})