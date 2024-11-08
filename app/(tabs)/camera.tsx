import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, SafeAreaView, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#363636FF'
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
      alignSelf: 'flex-start',
      zIndex: 100
  },
  
  logo: {
      position: 'relative',
      height: '90%',
      width: '90%',
      zIndex: 10
  },

  video: {
    width: '98%',
    height: '30%',
    borderColor: '#182D8DFF',
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: "#000000F6",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },

});

export default function Camera() {
  const [videoURL, setVideoURL] = useState('http://127.0.0.1:5000/video_feed?time=' + new Date().getTime());

  // Atualiza a imagem a cada 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoURL('http://127.0.0.1:5000/video_feed?time=' + new Date().getTime());
    }, 2000000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>

    <SafeAreaView style={styles.container}>
      <Image
          source={{ uri: videoURL }}
          style={styles.video}
          resizeMode="cover"
        />
    </SafeAreaView>
    <Image source={require('../../assets/images/coloridinho.jpg')} style={styles.coloridinho}/>
</>
  );
}

