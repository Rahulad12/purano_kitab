import type { Book } from "../types";

const books: Book[] = [
  {
    id: "1",
    img: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    price: "1200",
    description:
      "A young wizard, Harry Potter, discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
  },
  {
    id: "2",
    img: "https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg",
    title: "The Alchemist",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    author: "Paulo Coelho",
    price: "950",
    description:
      "A young Andalusian shepherd named Santiago embarks on a journey to find a hidden treasure near the pyramids of Egypt.",
  },
  {
    id: "3",
    img: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    title: "Atomic Habits",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    author: "James Clear",
    price: "1100",
    description:
      "An insightful guide on how to build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
  },
  {
    id: "4",
    img: "https://images-na.ssl-images-amazon.com/images/I/81drfTT9ZfL.jpg",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    price: "1000",
    description:
      "A brutally honest self-help book that cuts through the clichés to offer raw, refreshing life advice.",
  },
  {
    id: "5",
    img: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    price: "900",
    description:
      "This personal finance classic explores the mindset differences between the 'rich dad' and 'poor dad' and how to achieve financial independence.",
  },

  {
    id: "6",
    img: "https://images-na.ssl-images-amazon.com/images/I/71KilybDOoL.jpg",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    price: "800",
    description:
      "Set in the American South, the novel deals with serious issues like racial injustice through the innocent eyes of young Scout Finch.",
  },
  {
    id: "7",
    img: "https://images-na.ssl-images-amazon.com/images/I/81gepf1eMqL.jpg",
    title: "1984",
    author: "George Orwell",
    seller: {
      _id: "1",
      full_name: "John Doe",
      address: "123 Main St, Anytown, USA",
      email: "TJd8H@example.com",
      phone: "+1 (123) 456-7890",
      website: "https://example.com",
    },
    price: "950",
    description:
      "A dystopian novel about totalitarianism, mass surveillance, and the suppression of free thought in a repressive society.",
  },
];

export default books;
