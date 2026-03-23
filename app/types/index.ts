// create book dtos
export interface CreateBookInformation {
  title: string | undefined;
  author?: string;
  description?: string;
  price: string;
  image_url?: string;
}

export interface CreateBookResponse {
  message: string;
  success: boolean;
  data: {
    owner: string;
    title: string;
    author: string;
    description: string;
    price: string;
    image_url: string;
    isAvailable: boolean;
    isSold: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Book {
  id: string;
  seller: SellerInformation;
  title: string;
  image_url?: string;
  price: string;
  author?: string;
  description?: string;
}
export interface BookDetails {
  _id: string;
  owner: SellerInformation;
  title: string;
  author: string;
  description: string;
  image_url: string;
  price: string;
  isAvailable: boolean;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookByUserResponseType {
  message: string;
  success: boolean;
  books: BookDetails[];
}
export interface SellerInformation {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  phoneNumber?: string;
  isActive: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  phoneNumber?: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface AuthRequest {
  email: string;
  password: string;
  phoneNumber?: string;
}

//favorite
export interface BookSaveAsFavoriteResponse {
  message: string;
  success: boolean;
}

export interface GetALLSavedBooksResponse {
  message: string;
  success: boolean;
  favorites: {
    _id: string;
    book: string;
    user: string;
    _v: number;
  }[];
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangeEmailDto {
  email: string;
  password: string;
}
