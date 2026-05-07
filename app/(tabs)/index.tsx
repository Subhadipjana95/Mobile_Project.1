import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Mock data generator for the contribution graph
const generateContributions = () => {
  const weeks = 18; // Approx 4-5 months of data like the screenshot
  const days = 7;
  const grid = [];
  for (let i = 0; i < days; i++) {
    const row = [];
    for (let j = 0; j < weeks; j++) {
      // 0: empty, 1: light green, 2: medium, 3: dark, 4: very dark
      const level = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      row.push(level);
    }
    grid.push(row);
  }
  return grid;
};

const getColorForLevel = (level: number, isDark: boolean) => {
  if (level === 0) return isDark ? '#1e1e1e' : '#ebedf0';
  if (level === 1) return '#0e4429';
  if (level === 2) return '#006d32';
  if (level === 3) return '#26a641';
  return '#39d353';
};

export default function Home() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contributions] = useState(generateContributions());

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("User not found");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: isDark ? '#050505' : '#f6f8fa' }}
      contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>{userData.name || userData.login}</Text>
          <Text style={[styles.username, { color: isDark ? '#8b949e' : '#57606a' }]}>{userData.login}</Text>
        </View>
      </View>

      {/* Meta Info */}
      <View style={styles.metaContainer}>
        {userData.location && (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="map-marker" size={16} color={isDark ? '#8b949e' : '#57606a'} />
            <Text style={[styles.metaText, { color: isDark ? '#8b949e' : '#57606a' }]}>{userData.location}</Text>
          </View>
        )}
        {userData.blog && (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="link-variant" size={16} color="#39d353" />
            <Text style={[styles.metaText, { color: '#39d353' }]}>{userData.blog.replace(/^https?:\/\//, '')}</Text>
          </View>
        )}
      </View>

      {/* Contributions Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
          <Text style={{ color: '#39d353', fontWeight: 'bold' }}>3,542</Text> contributions in the last year
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#8b949e' : '#57606a'} />
      </View>

      <View style={[styles.contributionCard, { backgroundColor: isDark ? '#161b22' : '#fff', borderColor: isDark ? '#30363d' : '#d0d7de' }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.grid}>
            {contributions.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.gridRow}>
                {row.map((level, colIndex) => (
                  <View 
                    key={`cell-${rowIndex}-${colIndex}`} 
                    style={[styles.cell, { backgroundColor: getColorForLevel(level, isDark) }]} 
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.statsRow}>
          <Text style={[styles.statText, { color: isDark ? '#8b949e' : '#57606a' }]}>
            <Text style={{ color: '#39d353', fontWeight: 'bold' }}>+1,928</Text> more than 9/17/24
          </Text>
          <Text style={[styles.statText, { color: isDark ? '#8b949e' : '#57606a' }]}>
            <Text style={{ color: '#39d353', fontWeight: 'bold' }}>449</Text> day streak
          </Text>
        </View>
      </View>

      {/* Lists Section */}
      <View style={[styles.listContainer, { backgroundColor: isDark ? '#161b22' : '#fff', borderColor: isDark ? '#30363d' : '#d0d7de' }]}>
        <View style={[styles.listItem, { borderBottomColor: isDark ? '#30363d' : '#d0d7de', borderBottomWidth: 1 }]}>
          <View style={styles.listLeft}>
            <View style={[styles.iconBox, { backgroundColor: isDark ? '#30363d' : '#f3f4f6' }]}>
              <MaterialCommunityIcons name="book-outline" size={20} color={isDark ? '#8b949e' : '#57606a'} />
            </View>
            <Text style={[styles.listTitle, { color: isDark ? '#fff' : '#000' }]}>Repositories</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={[styles.listCount, { color: isDark ? '#8b949e' : '#57606a' }]}>{userData.public_repos}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#8b949e' : '#57606a'} />
          </View>
        </View>

        <View style={styles.listItem}>
          <View style={styles.listLeft}>
            <View style={[styles.iconBox, { backgroundColor: '#e3b34120' }]}>
              <MaterialCommunityIcons name="star-outline" size={20} color="#e3b341" />
            </View>
            <Text style={[styles.listTitle, { color: isDark ? '#fff' : '#000' }]}>Starred</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={[styles.listCount, { color: isDark ? '#8b949e' : '#57606a' }]}>{userData.public_gists || 3}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#8b949e' : '#57606a'} />
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginTop: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
  },
  contributionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 32,
  },
  grid: {
    gap: 4,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 4,
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statText: {
    fontSize: 12,
  },
  listContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listCount: {
    fontSize: 16,
  },
});
