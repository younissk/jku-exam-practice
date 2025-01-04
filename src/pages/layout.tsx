import { AppShell, Burger, Button, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

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
