import { StyleSheet, Image, Platform, SafeAreaView, Dimensions, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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
        alignSelf: 'flex-start',
        zIndex: 100
    },
    
    deleteButton: {
      color: '#DA3416FF',
      // fontFamily: 'Karla',
      fontWeight: 'bold',
      fontSize: 16,
      padding: 2
    },

    table: {
      borderColor: '#305BE9FF',
      borderWidth: 2,
      borderRadius: 6
    },

    item: {
      
    },

    id: {
      maxWidth: 80,
    },

    sector: {
      maxWidth: 300,
      // fontFamily: 'Karla',
      fontSize: 17,
      padding: 5
    },

    time: {
      maxWidth: 300,
      // fontFamily: 'Karla',
      fontSize: 17,
      padding: 5
    }
  });

interface IData {
  id: string,
  sector: string,
  timeInit: string,
  timeEnd: string,
}

export default function Views() {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "deliveries"), (snapshop) => {
      const dataList: IData[] = snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IData[];
      setData(dataList);
    })

    return () => unsubscribe();
  }, []);




  const deleteItem = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, "deliveries", id));
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
    
        <View style={styles.table}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  
                  <View style={styles.item}>
                                    
                    <Text style={styles.id} numberOfLines={1} ellipsizeMode='tail'>{item.id}</Text>
                    
                    <Text style={styles.sector} numberOfLines={1} ellipsizeMode='tail'>{item.sector}</Text>
    
                    <Text style={styles.time} numberOfLines={1} ellipsizeMode='tail'>{item.timeInit}</Text>
    
                    <Text style={styles.time} numberOfLines={1} ellipsizeMode='tail'>{item.timeEnd}</Text>
                    
                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                      <Text style={styles.deleteButton}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
    
                )}
              />
            </View>
          
        </SafeAreaView>
        <Image source={require('../../assets/images/coloridinho.jpg')} style={styles.coloridinho}/>
    </GestureHandlerRootView>
  );
}
