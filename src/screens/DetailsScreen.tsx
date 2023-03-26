import React, {useEffect, useState} from 'react'
import {
    StatusBar,
    StyleSheet,
    SafeAreaView,
    Image,
    View,
    Text,
    ScrollView,
    Dimensions,
    Animated,
    PanResponder,
    GestureResponderEvent,
    PanResponderGestureState,
} from 'react-native'
import {DealType, RootStackParamList} from '../interfaces'
import {useRoute} from '@react-navigation/native'
import type {RouteProp} from '@react-navigation/native'

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
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    {deal?.media.length && (
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[
                                styles.cardImage,
                                {transform: [{translateX: imageOffsetX}]},
                            ]}>
                            <Image
                                style={styles.cardImage}
                                source={{uri: deal?.media[imageIndex]}}
                            />
                        </Animated.View>
                    )}
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{deal?.title}</Text>
                        <Text style={styles.cardText}>
                            {new Intl.NumberFormat('us-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(deal?.price! / 100)}
                        </Text>
                        <Text style={styles.cardText}>{deal?.cause.name}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={[styles.cardBody, {borderTopWidth: 0}]}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                                style={styles.cardAvatar}
                                source={{uri: deal?.user?.avatar}}
                            />
                            <Text
                                style={[
                                    styles.cardTitle,
                                    {marginLeft: 5, fontSize: 20},
                                ]}>
                                {deal?.user?.name}
                            </Text>
                        </View>

                        <Text
                            style={[
                                styles.cardText,
                                {textAlign: 'justify', marginTop: 10},
                            ]}>
                            {deal?.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
        height: 200,
    },

    cardAvatar: {
        width: '25%',
        height: 90,
    },
})

export default DetailsScreen
