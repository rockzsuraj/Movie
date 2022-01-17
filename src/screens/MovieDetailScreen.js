import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const MovieDetailScreen = ({ navigation }) => {
    const poster = navigation.getParam('poster');
    const name = navigation.getParam('name');
    const rating = navigation.getParam('rating');
    const overview = navigation.getParam('overview');
    return (
        <View>
            <Image
                source={{ uri: `${'https://image.tmdb.org/t/p/w300' + poster}` }}
                style={{
                    height: 400,
                    width: 300,
                    padding: 10,
                    marginTop: 10
                }}
            />
            <Text style={{ fontSize: 25 }}>Movie name: {name}</Text>
            <Text style={{ fontSize: 25 }}>Movie rating: {rating}</Text>
            <Text style={{ fontSize: 25 }}>Overview: {overview}</Text>
        </View>
    )
}

export default MovieDetailScreen

const styles = StyleSheet.create({})
