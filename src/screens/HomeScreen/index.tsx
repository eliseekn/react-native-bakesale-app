import React, {useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native'
import DealList from '../../components/DealList'
import SearchBar from '../../components/SearchBar'
import {DealType} from '../../interfaces'
import {styles} from './styles'

const HomeScreen = (): JSX.Element => {
    const [dealList, setDealList] = useState<DealType[]>([])

    useEffect(() => {
        fetchDealList('')
    }, [])

    const fetchDealList = async (query: string) => {
        const url =
            query !== ''
                ? 'https://bakesaleforgood.com/api/deals?searchTerm=' + query
                : 'https://bakesaleforgood.com/api/deals'

        const res = await fetch(url)
        const data = await res.json()
        setDealList(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar onSearch={fetchDealList} />
            <DealList data={dealList} />
        </SafeAreaView>
    )
}

export default HomeScreen
