// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPage = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results],// concatenation des deux tableaux en les copiant
                    // grâce aux spreads
                    isLoading: false
                })
            })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPage = 0
        this.setState({
            films: []
        }, () => {
            console.log("Page: " + this.page + ", Total: " + this.totalPage + ", Nombre de films: " + this.state.films.length)
            this._loadFilms()
        })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    render() {
        console.log("RENDER")
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onSubmitEditing={() => this._searchFilms()}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button title='Rechercher' onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    onEndReachedTreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPage) {
                            this._loadFilms()
                        }
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        top: 100,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search