import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';


const HomeScreen = ({ navigation }) => {
    const baseURL = 'https://api.themoviedb.org/3';
    const API_KEY = 'api_key=aacd0e2817db705aa66a81fa6bfc0771';
    const searchURL = baseURL + '/search/movie?' + API_KEY + '&query=';


    const [username, setUsername] = useState('');
    const [movie, setMovie] = useState([]);
    const [searchMovie, setSeachMovie] = useState('');
    const [trendingmovie, setTrendingMovie] = useState([]);
    const [allMovie, setAllMovie] = useState([]);

    console.log("Movie", movie)



    const getMovie = async () => {
        try {
            await fetch(searchURL + searchMovie).then(res => res.json()).then(data => {
                if (data) {
                    setMovie(data.results);
                }
            })
        } catch (error) {
            console.log('error', error.message);
        }

    }
    const getTrendingMovie = async () => {
        try {
            await fetch(baseURL + '/discover/movie?sort_by=popularity.desc&' + API_KEY).then(res => res.json()).then(data => {
                setTrendingMovie(data.results);
            })
        } catch (error) {
            console.log('error', error.message);
        }

    }
    const allNewMovie = async () => {
        try {
            await fetch(baseURL + '/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&' + API_KEY).then(res => res.json()).then(data => {
                setAllMovie(data.results);
            })
        } catch (error) {
            console.log('error', error.message);
        }

    }

    async function getData() {
        try {
            await AsyncStorage.getItem('user').then(value => {
                value != null ? setUsername(JSON.parse(value).userName) : setUsername('');
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(movie, ".empty..movie")
        getTrendingMovie()
        allNewMovie()

    }, []);

    return (
        <View style={styles.container}>
            <NavigationEvents onDidFocus={getData} />
            <Text style={styles.Header}>Hello {username}</Text>
            <Input
                style={styles.searchBox}
                placeholder='Search Movie...'
                onChangeText={text => { setSeachMovie(text) }}
                onSubmitEditing={getMovie}
            />

            {!searchMovie ? <View>
                <Text style={{ fontSize: 25 }}>Trending movie</Text>
                <FlatList
                    pagingEnabled={true}
                    horizontal
                    showsHorizontalScrollIndicator={false}

                    legacyImplementation={false}
                    keyExtractor={item => item.id}
                    data={trendingmovie}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.results}>
                                <Image
                                    source={{ uri: `${'https://image.tmdb.org/t/p/w300' + item.poster_path}` }}
                                    style={{
                                        width: 400,
                                        height: 300,
                                        margin: 10
                                    }}
                                    resizeMethod='resize'
                                />

                            </View>

                        )
                    }}
                />
                <Text style={{ fontSize: 25 }}>All movie</Text>
                <FlatList
                    keyExtractor={item => item.id}
                    data={allMovie}
                    numColumns={2}
                    pagingEnabled={true}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieDetail', { poster: item.poster_path, name: item.title, rating: item.vote_average, overview: item.overview })}
                        >
                            <View style={styles.results}>
                                <Image
                                    source={{ uri: `${'https://image.tmdb.org/t/p/w300' + item.poster_path}` }}
                                    style={{
                                        width: 180,
                                        height: 180,
                                        marginLeft: 10

                                    }}
                                    resizeMethod='resize'
                                />
                                <Text style={styles.heading}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )}

                />

            </View> : <View><FlatList
                keyExtractor={item => item.id}
                data={movie}
                horizontal={false}
                numColumns={2}
                pagingEnabled={true}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MovieDetail', { poster: item.poster_path, name: item.title, rating: item.vote_average, overview: item.overview })}
                    >
                        <View style={styles.result}>
                            <Image
                                source={{ uri: `${'https://image.tmdb.org/t/p/w300' + item.poster_path}` }}
                                style={{
                                    width: 180,
                                    height: 180,
                                    marginLeft: 10
                                }}
                                resizeMethod='resize'
                            />
                            <Text style={styles.heading}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            </View>

            }
        </View>

    )
}
HomeScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        paddingTop: 50
    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        width: '100%',
        borderRadius: 8,
        padding: 7,
        borderWidth: 2
    },
    Header: {
        fontSize: 25,
        fontWeight: '700',
        color: 'black'
    },
    results: {
        flex: 1,
        flexWrap: 'wrap'
    },
    result: {
        flex: 1,
    },
    heading: {
        flex: 2,
        color: 'black',
        fontSize: 15,
        fontWeight: '700',
        padding: 10,
        backgroundColor: '#FFFF',
        width: 180
    }

})
