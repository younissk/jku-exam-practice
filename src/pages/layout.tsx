import { AppShell, Burger, Button, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  console.log("AppLayout - Current User:", user); // Log the current user state in AppLayout

  const handleLogout = () => {
    console.log("Logging out user:", user); // Log the user being logged out
    setUser(null); // Clear the user from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <h3>JKU Exam Simulator</h3>
            <Group ml="xl" gap={10} visibleFrom="sm">
              <Link to="/">Home</Link>
              <Link to="/bookmarks">Bookmarks</Link>
              <Link to="/about">About</Link>
              <Link to="/exam-request">Request an Exam</Link>
              <Link to="/feature-request">Request a Feature</Link>
              {user ? (
                <>
                  <span>Welcome, {user.email}!</span>
                  <Button onClick={handleLogout} variant="light">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/login")} variant="light">
                  Login
                </Button>
              )}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/exam-request">Request an Exam</Link>
            <Link to="/feature-request">Request a Feature</Link>
            {user ? (
              <Button onClick={handleLogout} variant="light">
                Logout
              </Button>
            ) : (
              <Button variant="light" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>
        </AppShell.Section>
        <AppShell.Section>Made with ❤️</AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
