
import { StyleSheet, TextInput} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000'}
    onChangeText={setTextChange}
    keyboardType="email-address"
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FCF9F9',
    borderColor: '#000',
    borderWidth: 1,
    color: "#000", // Color del texto
    fontWeight: '800',
    width: 250,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  },

});