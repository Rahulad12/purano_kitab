import { useCreateBooks } from "@/app/api/hooks/books";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import { CreateBookInformation } from "@/app/types";
import React, { useState } from "react";
import { View } from "react-native";

const SellBooks = () => {
  const [formData, setFormData] = useState<CreateBookInformation>({
    title: "",
    price: "",
    author: "",
    description: "",
    image_url: "",
  });

  const { mutateAsync: createBook } = useCreateBooks();
  const handleFormSubmit = async () => {
    try {
      await createBook(formData as CreateBookInformation);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PageScrollLayout
      title="Create Book List"
      subtitle="List your book to sell"
    >
      <Input
        label="Title"
        placeholder="Harry Potter and the Sorcerer's Stone"
        value={formData?.title || ""}
        onChangeText={(value: string | undefined) =>
          setFormData({ ...formData, title: value })
        }
      />
      <Input
        label="Author"
        placeholder="J.K. Rowling"
        value={formData.author || ""}
        onChangeText={(value) => setFormData({ ...formData, author: value })}
      />
      <Input
        label="Description"
        placeholder="short description on the book"
        value={formData.description || ""}
        onChangeText={(value) =>
          setFormData({ ...formData, description: value })
        }
      />
      <Input
        label="Price"
        placeholder="Rs. 2345"
        value={formData.price || ""}
        onChangeText={(value) => setFormData({ ...formData, price: value })}
      />
      <Input
        label="Imge_url"
        placeholder="https://via.placeholder.com/100x150.png?text=No+Image"
        value={formData.image_url || ""}
        onChangeText={(value) => setFormData({ ...formData, image_url: value })}
      />

      <View>
        <Button variant={"primary"} onPress={handleFormSubmit}>
          {" "}
          List Book
        </Button>
      </View>
    </PageScrollLayout>
  );
};

export default SellBooks;
