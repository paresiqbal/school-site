import { createContext, useEffect, useState, useMemo } from "react";

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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch the token from localStorage on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch user data when the token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    async function getUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          // Handle invalid token or unauthorized access
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUser();
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken, user }),
    [token, user]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
