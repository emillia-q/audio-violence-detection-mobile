import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Audio Violence Mobile</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertically
    alignItems: 'center',     // horizontally
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});