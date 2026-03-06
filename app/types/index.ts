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
  owner: string;
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
export interface SellerInformation {
  _id: string;
  full_name: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface AuthRequest {
  email: string;
  password: string;
}
