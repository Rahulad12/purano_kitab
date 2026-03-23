import { createContext, useState } from "react";
import { User } from "../types";

interface PuranoKitabContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const PuranoKitabContext = createContext<PuranoKitabContextType | null>(
  null,
);

export const PuranoKitabProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <PuranoKitabContext.Provider value={{ user, setUser }}>
      {children}
    </PuranoKitabContext.Provider>
  );
};
