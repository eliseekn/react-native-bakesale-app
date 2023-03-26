import React from 'react'
import {StyleSheet, TextInput} from 'react-native'

type Props = {
    onSearch: (text: string) => void
}

const SearchBar = ({onSearch}: Props): JSX.Element => {
    return (
        <TextInput
            style={styles.input}
            placeholder={'Search deal'}
            onChangeText={onSearch}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 17,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
})

export default SearchBar
