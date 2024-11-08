import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, Alert, View, Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, Timestamp } from 'firebase/firestore'; // Importa o Timestamp
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D3D3D3FF'
  },
  button: {
    backgroundColor: '#56ADFFFF',
    padding: 10,
    borderRadius: 5,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
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
  input: {
    height: height / 18,
    width: width / 1.5,
    maxWidth: 400,
    borderColor: "#236C9CFF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#FFFFFFDC'
  },
  inputBox: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface IData {
  id: string;
  sector: string;
  timeInit: Timestamp;
  timeEnd: Timestamp;
}

enum Sector {
  ETS = 'ETS',
  SAP = 'SAP',
  ENGINEERING = 'Engenharia',
  ICO = 'ICO',
  BDO = 'BDO',
  TEF = 'TEF',
  RH = 'RH',
  SENNA = 'SENNA',
  REMAN = 'REMAN'
}

export default function Index() {
  const [data, setData] = useState<IData[]>([]);
  const [newSector, setNewSector] = useState<Sector | ''>('');
  const [newTimeInit, setNewTimeInit] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "deliveries"), (snapshot) => {
      const dataList: IData[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IData[];
      setData(dataList);
    });
    return () => unsubscribe();
  }, []);

  const add = async () => {
    if (!newSector || !newTimeInit) {
        Alert.alert("Por favor, insira todos os campos!");
        return;
    }

    const initTimestamp = Timestamp.fromDate(new Date(newTimeInit));

    await addDoc(collection(FIREBASE_DB, "deliveries"), { sector: newSector, timeInit: initTimestamp });
    setNewSector('');
    setNewTimeInit('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 23, margin: 15, fontWeight: 'bold', color: '#1E78A1FF'}}>Add new deliveries</Text>
        <View style={styles.inputBox}>
          <Picker
            selectedValue={newSector}
            onValueChange={(itemValue) => setNewSector(itemValue as Sector)}
            style={styles.input}
          >
            <Picker.Item label="Select Sector" value="" />
            {Object.values(Sector).map((sector) => (
              <Picker.Item label={sector} value={sector} key={sector} />
            ))}
          </Picker>
          <TextInput style={styles.input} placeholder='Start time (YYYY-MM-DD hh:mm:ss)' value={newTimeInit} onChangeText={setNewTimeInit} />
          <TouchableOpacity onPress={add}>
            <View style={styles.button}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: "#ffffff"}}>Insert</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Image source={require('../../assets/images/coloridinho.jpg')} style={styles.coloridinho}/>
    </GestureHandlerRootView>
  );
}
