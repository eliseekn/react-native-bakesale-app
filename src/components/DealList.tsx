import React from 'react'
import {FlatList} from 'react-native'
import {DealType} from '../interfaces'
import DealItem from './DealItem'

type Props = {
    data: DealType[]
}

const DealList = ({data}: Props): JSX.Element => {
    const renderItem = ({item}: {item: DealType}): JSX.Element => {
        return <DealItem deal={item} />
    }

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
        />
    )
}

export default DealList
