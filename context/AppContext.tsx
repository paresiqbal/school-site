import { createContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
}

export const AppContext = createContext<AppContextType>({
  token: null,
  setToken: () => {},
  user: null,
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user }}>
      {children}
    </AppContext.Provider>
  );
}
