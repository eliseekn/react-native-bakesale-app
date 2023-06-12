import React from 'react'
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
            style={{
                marginBottom: 15,
                borderRadius: 15,
                backgroundColor: 'white',
            }}
        />
    )
}

export default SearchBar
