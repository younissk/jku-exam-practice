import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in, update context
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        });
        console.log("User logged in:", firebaseUser);
      } else {
        // User is logged out
        setUser(null);
        console.log("User logged out");
      }
      setLoading(false); // Set loading to false after auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally, show a loading screen while checking auth
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
