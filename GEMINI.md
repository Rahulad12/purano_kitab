# Purano Kitab (Old Books) - Project Context

Welcome to the Purano Kitab repository. This project is a React Native mobile application built with Expo, designed to be a marketplace for buying and selling used, rare, and collectible books.

## Project Identity & Mission
**Purano Kitab** aims to connect book enthusiasts by providing a seamless platform for trading old books. The app prioritizes ease of use, secure transactions, and a community-driven marketplace.

## Technology Stack
- **Framework**: React Native with [Expo](https://expo.dev) (SDK 55+)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction) (File-based routing)
- **Language**: TypeScript
- **State Management**: 
  - **Server State**: [React Query](https://tanstack.com/query/latest) (TanStack Query)
  - **Global/UI State**: Context API
- **Networking**: Axios (with custom interceptors for auth)
- **Styling**: Custom styling system located in `app/style/` (Vanilla React Native `StyleSheet`)
- **Storage**: 
  - `AsyncStorage` for non-sensitive persistent data.
  - `SecureStore` for JWT tokens and sensitive information.

## Project Structure & Architecture

### Directory Overview
- `app/`: The core of the application (Expo Router).
  - `api/`: API services, Axios configuration, and React Query hooks (`hooks/`).
  - `auth/`: Screens related to authentication (Login, Register, OAuth success).
  - `protected/`: Authenticated-only routes (Home, Profile, Sell Books).
  - `components/`: 
    - `ui/`: Atom-level reusable components (Button, Input, Card).
    - `common/`: Higher-level reusable components (Header, Footer, Loaders).
  - `context/`: React Context providers (Auth, Theme).
  - `style/`: Centralized styling constants, typography, and themes.
  - `types/`: Global TypeScript interfaces.
- `assets/`: Images and fonts.
- `docs/`: Technical documentation (Architecture, API design, features).
- `taskboard/`: Project management and roadmap tracking.

### Key Architectural Patterns
1.  **Auth Guarding**: Protected routes are managed via the `app/protected/_layout.tsx` and a `Protected.tsx` wrapper that checks the `AuthContext` state.
2.  **Server State**: All data fetching from the backend should use React Query hooks located in `app/api/hooks/`. Avoid direct `useEffect` fetching in components.
3.  **Authentication Flow**:
    - Supports Email/Password and Google OAuth (via `expo-auth-session`).
    - Tokens are stored in `SecureStore`.
    - `axiosInstance.ts` handles attaching tokens to requests and 401 response handling.
4.  **Styling**: Strictly follow the established styling patterns in `app/style/`. Use constants from `colors.ts`, `spacing.ts`, and `typography.ts` instead of hardcoding values.

## Development Workflow

### Common Commands
- `yarn start`: Starts the Expo development server.
- `yarn android`: Runs the app on an Android emulator/device.
- `yarn ios`: Runs the app on an iOS simulator.
- `yarn lint`: Runs ESLint check.

### Guidelines for Agents & Contributors
- **Respect the Legacy**: This project has an established structure. Adhere strictly to the existing folder organization and naming conventions.
- **Surgical Changes**: When modifying components, maintain consistency with the custom styling system. Do not introduce external UI libraries (like Tailwind or Paper) unless explicitly requested.
- **Type Safety**: Maintain 100% TypeScript coverage for new features. Define interfaces in `app/types/index.ts` or close to the implementation if localized.
- **Documentation**: If adding new features or changing architecture, update the corresponding files in `docs/` and `GEMINI.md` if necessary.
- **Testing**: While automated tests are not yet fully implemented, ensure manual validation on both Android and iOS (if possible) for UI changes.

## Current Priorities
- Payment integration completion.
- Implementing advanced search filters.
- Developing the real-time messaging system between buyers and sellers.
