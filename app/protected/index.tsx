import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useGetBooks } from "../api/hooks/books";
import { useSaveBookAsFavorite } from "../api/hooks/favorite";
import { useGetLoggedInUserDetails } from "../api/hooks/user";
import { usePuranoContext } from "../context/use-context/use-purano-context";
import FeaturedBooks from "./home/FeaturedBooks";
import Hero from "./home/Hero";
import RecentlyListed from "./home/RecentlyListed";

const Home = () => {
  const { data: books, isFetching: isLoading } = useGetBooks();
  const { mutateAsync: saveBook, isPending: isSaving } =
    useSaveBookAsFavorite();

  const handleBookSaveAsFavorite = async (bookId: string) => {
    try {
      await saveBook(bookId);
    } catch (error) {
      console.error("Error saving book as favorite:", error);
    }
  };

  const { setUser } = usePuranoContext();
  const { data: loggedInUser, isFetching: isLoadingUser } =
    useGetLoggedInUserDetails();

  useEffect(() => {
    if (loggedInUser && !isLoadingUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser, isLoadingUser, setUser]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Hero />
        <FeaturedBooks books={books} isLoading={isLoading} />
        <RecentlyListed
          books={books}
          isLoading={isLoading}
          handleFavSave={handleBookSaveAsFavorite}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
