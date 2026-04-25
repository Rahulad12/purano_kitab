# Purano Kitab - Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Native Expo App                      │
│  (iOS & Android via Expo)                                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Axios (HTTP)
                           ↓
┌──────────────────────────────────────────────────────────────────┐
│                    Backend API Server                            │
│  - Express/Node.js                                               │
│  - JWT Authentication                                            │
│  - REST Endpoints                                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────────────┐
│                     Database                                     │
│  - User data                                                     │
│  - Book listings                                                 │
│  - Transactions                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Folder Structure
```
app/
├── api/                    # API calls & hooks
│   ├── hooks/             # React Query hooks
│   ├── axiosInstance.ts   # Axios config with interceptors
│   └── auth.service.config.helper.ts
├── auth/                  # Authentication screens
│   ├── Login.tsx
│   └── success.tsx (OAuth callback)
├── protected/             # Protected routes (requires auth)
│   ├── home/
│   ├── profile/
│   └── sellbooks/
├── components/            # Reusable components
│   ├── ui/                # UI components (Button, Input, etc)
│   ├── common/            # Common components (Header, Footer, Loader)
│   └── Protected.tsx      # Auth guard wrapper
├── context/               # Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── types/                 # TypeScript interfaces
└── style/                 # Styling constants
```

### Data Flow

1. **Authentication Flow**
   ```
   Login Page → API Call → JWT Token → Store Token (SecureStore)
        ↓
   Success Page → Fetch User Data → Update Auth Context
        ↓
   Protected Routes → Check Auth → Redirect to Home
   ```

2. **API Request Flow**
   ```
   Component → useQuery/useMutation → axios interceptor
        ↓
   Add Authorization Header (token from SecureStore)
        ↓
   Send Request → Receive Response
        ↓
   Handle 401 (Clear Storage) → Component State
   ```

3. **State Management**
   - **Auth Context**: User login state, user data, auth functions
   - **Theme Context**: Light/Dark mode
   - **React Query**: Server state (books, user details, etc)
   - **AsyncStorage**: Persistent user data
   - **SecureStore**: Sensitive data (JWT tokens)

## Key Components

### AuthContext
- `isLoggedIn`: Boolean flag for authentication state
- `user`: Current user object
- `setUser()`: Update user data
- `setIsLoggedIn()`: Update login state

### API Interceptors
- **Request**: Adds Authorization header with token
- **Response**: Handles 401 errors by clearing storage and redirecting

### Protected Routes
- `Protected` component wraps auth-required routes
- Checks `isLoggedIn` and redirects to login if false

## Authentication Flow

```
Google Login Button
        ↓
Expo Auth Session → Google OAuth
        ↓
Receive Code → Backend Exchange Code for Token
        ↓
Backend Returns JWT + User Data
        ↓
Redirect to /auth/success?token=XXX
        ↓
Store Token (SecureStore)
        ↓
Fetch User Details with Token
        ↓
Update Auth Context
        ↓
Redirect to /protected (Home)
```

## Error Handling

1. **Network Errors**: Handled by axios interceptors
2. **401 Unauthorized**: Clear storage, redirect to login
3. **Form Validation**: Client-side validation before API calls
4. **Toast Notifications**: User feedback for errors/success

## Performance Considerations

- React Query caching for frequently accessed data
- Lazy loading of heavy components
- Token refresh mechanism (implement if needed)
- Pagination for book listings (implement if needed)
