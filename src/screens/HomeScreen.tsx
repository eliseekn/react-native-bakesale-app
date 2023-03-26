import React, {useEffect, useState} from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import DealList from '../components/DealList'
import SearchBar from '../components/SearchBar'
import {DealType} from '../interfaces'

function HomeScreen(): JSX.Element {
    // const [query, setQuery] = useState<string>('')
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 10,
        marginBottom: 10,
    },
})

export default HomeScreen
