import { StyleSheet, TextInput } from 'react-native';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#000'}
      secureTextEntry={contra}
      onChangeText={setTextChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
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
