import React from 'react'
import {FlatList} from 'react-native'
import {DealType} from '../../interfaces'
import DealItem from '../DealItem'

type Props = {
    data: DealType[]
}

const DealList = ({data}: Props): JSX.Element => {
    return (
        <FlatList
            data={data}
            renderItem={({item}: {item: DealType}) => <DealItem deal={item} />}
            keyExtractor={item => item.key}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default DealList
