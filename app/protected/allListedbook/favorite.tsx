import { useGetFavorite } from "@/app/api/hooks/favorite";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import React from "react";
import { Text } from "react-native";

const SavedAsFavorite = () => {
  const { data: favoriteBook } = useGetFavorite();
  return (
    <PageScrollLayout>
      <Text>Saved As Favorite</Text>
      {favoriteBook?.favorites.map((book) => (
        <Text key={book._id}>{book.book}</Text>
      ))}
    </PageScrollLayout>
  );
};

export default SavedAsFavorite;
