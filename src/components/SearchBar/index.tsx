import React from 'react'
// import {TextInput} from 'react-native'
import {styles} from './styles'
import {Searchbar} from 'react-native-paper'

type Props = {
    onSearch: (text: string) => void
    searchQuery: string
}

const SearchBar = ({onSearch, searchQuery}: Props): JSX.Element => {
    return (
        <Searchbar
            placeholder={'Search deal'}
            onChangeText={onSearch}
            value={searchQuery}
            style={styles.input}
        />
    )
}

export default SearchBar
