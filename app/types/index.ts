export interface Book {
  id: string;
  title: string;
  img?: string;
  price: string;
  author?: string;
  description?: string;
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
