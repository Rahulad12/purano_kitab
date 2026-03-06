import { SafeAreaView, ScrollView } from "react-native";
import { useGetBooks } from "../api/hooks/books";
import FeaturedBooks from "./home/FeaturedBooks";
import Hero from "./home/Hero";
import RecentlyListed from "./home/RecentlyListed";

const Home = () => {
  const { data: books, isFetching: isLoading } = useGetBooks();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Hero />
        <FeaturedBooks books={books} isLoading={isLoading} />
        <RecentlyListed books={books} isLoading={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
