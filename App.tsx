import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import {RootStackParamList} from './src/interfaces'

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Home'}}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{title: 'Details'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
