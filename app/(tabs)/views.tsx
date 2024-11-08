import { StyleSheet, Image, Platform, SafeAreaView, Dimensions, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D3D3D3FF',
    paddingVertical: 45
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
    fontWeight: 'bold',
    fontSize: 16,
    padding: 2
  },
  table: {
    borderColor: '#305BE9FF',
    borderWidth: 2,
    borderRadius: 6,
    width: '95%',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#ddd',
    padding: 10 
  },
  headerText: {
    flex: 1,               
    fontWeight: 'bold',     
    textAlign: 'center',    
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    padding: 10
  },
  id: {
    maxWidth: 40,
    flex: 1,               
    textAlign: 'center',    
    fontSize: 16,
  },
  textTable: {
    flex: 1,               
    textAlign: 'center',    
    fontSize: 16,
  },
});

interface IData {
  id: string,
  sector: string,
  timeInit: Timestamp | null, 
  timeEnd: Timestamp | null, 
}

export default function Views() {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "deliveries"), (snapshot) => {
      const dataList: IData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IData[];
      setData(dataList);
    });

    return () => unsubscribe();
  }, []);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, "deliveries", id));
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return 'A caminho'; 
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={styles.headerText}>ID</Text>
            <Text style={styles.headerText}>Setor</Text>
            <Text style={styles.headerText}>Início</Text>
            <Text style={styles.headerText}>Fim</Text>
            <Text style={styles.headerText}>Ações</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.id} numberOfLines={1} ellipsizeMode='tail'>{item.id}</Text>
                <Text style={styles.textTable} numberOfLines={1} ellipsizeMode='tail'>{item.sector}</Text>
                <Text style={styles.textTable} numberOfLines={1} ellipsizeMode='tail'>
                  {formatDate(item.timeInit)}
                </Text>
                <Text style={styles.textTable} numberOfLines={1} ellipsizeMode='tail'>
                  {formatDate(item.timeEnd)} 
                </Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <Image source={require('../../assets/images/coloridinho.jpg')} style={styles.coloridinho} />
    </GestureHandlerRootView>
  );
}
