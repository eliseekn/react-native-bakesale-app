import React from 'react'
import {DealType, RootStackParamList} from '../../interfaces'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {styles} from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>
type Props = {
    deal: DealType
}

const DealItem = ({deal}: Props): JSX.Element => {
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

export default React.memo(DealItem)
