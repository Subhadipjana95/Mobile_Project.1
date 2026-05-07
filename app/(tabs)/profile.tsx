import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function Profile() {
  const colorScheme = useColorScheme()
  return (
    <View style={{ ...styles.container, backgroundColor: colorScheme === "dark" ? "#0a0a0a" : "#fafafa" }}>
      <Text style={{ color: colorScheme === "dark" ? "#fafafa" : "#0a0a0a" }}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
