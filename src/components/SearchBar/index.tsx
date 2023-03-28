import React from 'react'
import {TextInput} from 'react-native'
import {styles} from './styles'

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

export default SearchBar
