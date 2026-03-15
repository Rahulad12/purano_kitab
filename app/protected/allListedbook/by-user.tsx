import { useGetBookByUser } from "@/app/api/hooks/books";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import React from "react";
import { Text, View } from "react-native";

const ListedByUser = () => {
  const { data: book, isFetching: isLoading } = useGetBookByUser();
  return (
    <PageScrollLayout>
      {book?.books?.map((book) => (
        <View>
          <Text key={book._id}>{book.title}</Text>
          <Text key={book._id}>{book.author}</Text>
        </View>
      ))}
    </PageScrollLayout>
  );
};

export default ListedByUser;
