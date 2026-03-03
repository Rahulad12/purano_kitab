import { SafeAreaView, ScrollView } from 'react-native';
import FeaturedBooks from './home/FeaturedBooks';
import Hero from './home/Hero';
import RecentlyListed from './home/RecentlyListed';

const Home = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Hero />
      <FeaturedBooks />
      <RecentlyListed />
    </ScrollView>
  </SafeAreaView>
);

export default Home;