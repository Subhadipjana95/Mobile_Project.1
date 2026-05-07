import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function SplashScreen() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleContinue = () => {
    if (username.trim()) {
      setLoading(true);
      setTimeout(() => {
        router.replace({ pathname: '/(tabs)', params: { username: username.trim() } });
      }, 500);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff', justifyContent: 'center', padding: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <MaterialCommunityIcons name="github" size={80} color={isDark ? '#fff' : '#000'} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDark ? '#fff' : '#000', marginTop: 16 }}>
          GitHub Profile
        </Text>
        <Text style={{ fontSize: 16, color: isDark ? '#888' : '#666', marginTop: 8, textAlign: 'center' }}>
          Enter a GitHub username to view their minimal dashboard.
        </Text>
      </View>

      <View style={{ backgroundColor: isDark ? '#111' : '#f0f0f0', borderRadius: 12, paddingHorizontal: 16, marginBottom: 20 }}>
        <TextInput
          placeholder="GitHub Username"
          placeholderTextColor={isDark ? '#666' : '#999'}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            height: 50,
            color: isDark ? '#fff' : '#000',
            fontSize: 16,
          }}
          onSubmitEditing={handleContinue}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        disabled={!username.trim() || loading}
        style={{
          backgroundColor: username.trim() ? (isDark ? '#fff' : '#000') : (isDark ? '#333' : '#ccc'),
          height: 50,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color={isDark ? '#000' : '#fff'} />
        ) : (
          <Text style={{ color: username.trim() ? (isDark ? '#000' : '#fff') : (isDark ? '#666' : '#999'), fontSize: 16, fontWeight: '600' }}>
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
