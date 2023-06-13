import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Image,
    View,
    ScrollView,
    Dimensions,
    Animated,
    PanResponder,
    GestureResponderEvent,
    PanResponderGestureState,
    Linking,
} from 'react-native'
import {DealType, RootStackParamList} from '../../interfaces'
import {useRoute} from '@react-navigation/native'
import type {RouteProp} from '@react-navigation/native'
import {styles} from '../styles'
import {Card, Avatar, Text, HelperText, Button} from 'react-native-paper'

type Props = RouteProp<RootStackParamList, 'Details'>

const DetailsScreen = (): JSX.Element => {
    const route = useRoute<Props>()
    const [deal, setDeal] = useState<DealType>()
    const [imageIndex, setImageIndex] = useState(0)
    const {width} = Dimensions.get('window')
    const imageOffsetX = new Animated.Value(0)

    const handleImageSwipe = (direction: 'left' | 'right') => {
        Animated.timing(imageOffsetX, {
            toValue: direction === 'left' ? -width : width,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setImageIndex(
                (imageIndex +
                    (direction === 'left' ? 1 : -1) +
                    deal?.media?.length!) %
                    deal?.media?.length!,
            )
            imageOffsetX.setValue(0)
        })
    }

    const handleOpenLink = async () => {
        Linking.canOpenURL(deal?.url as string).then(
            async (canOpen: boolean) => {
                if (canOpen) {
                    await Linking.openURL(deal?.url!)
                }
            },
        )
    }

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (
            event: GestureResponderEvent,
            gestureState: PanResponderGestureState,
        ) => {
            imageOffsetX.setValue(gestureState.dx)
        },
        onPanResponderRelease: (
            event: GestureResponderEvent,
            gestureState: PanResponderGestureState,
        ) => {
            if (Math.abs(gestureState.dx) > width * 0.25) {
                handleImageSwipe(gestureState.dx > 0 ? 'right' : 'left')
            } else {
                Animated.spring(imageOffsetX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start()
            }
        },
    })

    useEffect(() => {
        fetch('https://bakesaleforgood.com/api/deals/' + route.params.dealKey)
            .then(res => res.json())
            .then(data => setDeal(data))
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HelperText type="info" style={{textAlign: 'right'}}>
                    Swipe left or right for more images
                </HelperText>

                <Card style={{backgroundColor: 'white', marginBottom: 15}}>
                    {deal?.media.length && (
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={{
                                transform: [{translateX: imageOffsetX}],
                            }}>
                            <Image
                                style={{height: 200, borderRadius: 15}}
                                source={{uri: deal?.media[imageIndex]}}
                            />
                        </Animated.View>
                    )}
                    <Card.Content style={{marginTop: 10}}>
                        <Text variant="titleMedium" style={{fontSize: 18}}>
                            {deal?.title}
                        </Text>
                        <Text variant="bodyLarge">
                            {new Intl.NumberFormat('us-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(deal?.price! / 100)}
                        </Text>
                        <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
                            {deal?.cause.name}
                        </Text>
                    </Card.Content>
                </Card>

                <Card style={{backgroundColor: 'white', marginBottom: 15}}>
                    <Card.Content>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            {deal?.user?.avatar && (
                                <Avatar.Image
                                    size={80}
                                    source={{uri: deal?.user?.avatar}}
                                />
                            )}

                            <Text
                                variant="titleLarge"
                                style={{marginLeft: 15, fontWeight: 'bold'}}>
                                {deal?.user?.name}
                            </Text>
                        </View>

                        <Text
                            variant="bodyLarge"
                            style={{textAlign: 'justify', marginTop: 10}}>
                            {deal?.description}
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>

            <View style={{marginTop: 15, marginHorizontal: 80}}>
                <Button
                    icon="shopping-outline"
                    textColor="white"
                    buttonColor="gray"
                    mode="contained-tonal"
                    labelStyle={{fontSize: 18}}
                    onPress={() => handleOpenLink()}>
                    Buy this deal!
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default DetailsScreen
