// Components/Search.js

import { StyleSheet, View, TextInput, Button } from 'react-native'
import React from 'react'

class Search extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder="Titre du film"/>
                <Button title="Rechercher" onPress={ () => {}}/>
            </View>
        )
    }
}

export default Search

const styles = StyleSheet.create({

    main_container: {
        flex: 1,
        marginTop: 30,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})