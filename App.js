
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted' ) {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name] }
      );
      if (data.length > 0) {
        setContact(data);
        console.log(data);
      }
    }
  }

  return (
    <View style={styles.container}>
        <FlatList
          style={{margin: 5}}
          data={contact}
          renderItem={({item}) => <Text>{item.name}  {item.phoneNumbers[0].number}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      <View style={styles.button}>
        <Button title="Get contact" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
});
