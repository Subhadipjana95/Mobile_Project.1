import { Text, View, useColorScheme } from 'react-native';

export default function Home() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      }}
    >
      <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>
        Hello
      </Text>
    </View>
  );
}
