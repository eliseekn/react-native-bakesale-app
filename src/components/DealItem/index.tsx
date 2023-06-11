import React from 'react'
import {DealType, RootStackParamList} from '../../interfaces'
import {TouchableOpacity} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {Card, Text} from 'react-native-paper'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>
type Props = {
    deal: DealType
}

const DealItem = ({deal}: Props): JSX.Element => {
    const navigation = useNavigation<NavigationProp>()

    return (
        <TouchableOpacity
            style={{marginBottom: 15}}
            onPress={() => navigation.navigate('Details', {dealKey: deal.key})}>
            <Card style={{backgroundColor: 'white'}}>
                <Card.Cover source={{uri: deal.media[0]}} />
                <Card.Content style={{marginTop: 10}}>
                    <Text variant="titleMedium" style={{fontSize: 18}}>
                        {deal.title}
                    </Text>
                    <Text variant="bodyLarge">
                        {new Intl.NumberFormat('us-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(deal.price / 100)}
                    </Text>
                    <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
                        {deal.cause.name}
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default React.memo(DealItem)
