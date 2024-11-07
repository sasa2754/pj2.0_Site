import { router } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, View, Image, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3FF'
    },

    button: {
        width: width / 1.3,
        height: height / 8,
        backgroundColor: "#1F7CC7FF",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000C7",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 10,
        position: 'absolute',

    },

    coloridinho: {
        width: '100%',
        height: 10,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-start'
    },
    
    logo: {
        position: 'relative',
        height: '90%',
        width: '90%',
        zIndex: 10
    }
});

export default function Index() {
    const onPress = () => {
        router.push("/(tabs)");
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Image source={require('../assets/images/logoBoschBranco.png')} style={styles.logo}/>
                </TouchableOpacity>
            </SafeAreaView>
            <Image source={require('../assets/images/coloridinho.jpg')} style={styles.coloridinho}/>
        </>

    )
}