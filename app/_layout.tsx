import { NativeTabs, Icon, VectorIcon, Badge } from 'expo-router/unstable-native-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function RootLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger
        name="home"
        options={{
          title: 'Home',
        }}
        disableScrollToTop
      >
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={<VectorIcon family={MaterialCommunityIcons} name="home" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="profile"
        options={{
          title: 'Profile',
        }}
        disableScrollToTop
      >
        <Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          androidSrc={<VectorIcon family={MaterialCommunityIcons} name="account" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
