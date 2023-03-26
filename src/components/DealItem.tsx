import React, {PropsWithChildren} from 'react'
import {DealType, RootStackParamList} from '../interfaces'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>

const DealItem = ({
    deal,
}: PropsWithChildren<{
    deal: DealType
}>): JSX.Element => {
    const navigation = useNavigation<NavigationProp>()

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', {dealKey: deal.key})}>
            <Image style={styles.cardImage} source={{uri: deal.media[0]}} />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{deal.title}</Text>
                <Text style={styles.cardText}>
                    {new Intl.NumberFormat('us-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(deal.price / 100)}
                </Text>
                <Text style={styles.cardText}>{deal.cause.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },

    cardBody: {
        borderTopWidth: 1,
        padding: 10,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },

    cardText: {
        fontSize: 15,
        color: 'black',
    },

    cardImage: {
        width: '100%',
        height: 150,
    },
})

export default DealItem
