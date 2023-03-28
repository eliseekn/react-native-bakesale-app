import {StatusBar, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
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

    btn: {
        backgroundColor: 'gray',
        textAlign: 'center',
        padding: 10,
        marginHorizontal: 50,
    },
})
