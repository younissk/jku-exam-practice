import { 
  AppShell, 
  Burger, 
  Button, 
  Divider, 
  Group, 
  ScrollArea, 
  Stack, 
  Text, 
  TextInput, 
} from "@mantine/core";
import { IconHome2, IconCards, IconPlus, IconLogin, IconLogout, } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";
import { getUser, updateUser } from "../../firebase/firestore";
import { User } from "firebase/auth";
import UserXPIndicator from "../components/UserXPIndicator";
import { logout } from "../../firebase/auth";


export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  
  const { user, setUser } = useAuth() as {
    user: User | null;
    setUser: (user: User | null) => void;
  };

  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userData = await getUser(user.uid);
        setUsername(userData?.username || "");
      }
    };
    fetchUsername();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUsernameChange = async (newUsername: string) => {
    setIsLoading(true);
    setUsername(newUsername);
    if (user) {
      await updateUser(user.uid, { username: newUsername });
    }
    setIsLoading(false);
  };

  return (
    <AppShell
      header={{
        height: { base: 60, md: 70, lg: 80 },
      }}
      navbar={{
        width: { base: 200, md: 250, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700}>JKU Exam Simulator</Text>
          </Group>
        </Group>
      </AppShell.Header>

      {/* NAVBAR */}
      <AppShell.Navbar p="md">
        <ScrollArea>
          <div>

            {/* USER INFO + AVATAR */}
            {user && (
              <>
            <div>
              
                <Text size="sm" color="dimmed">
                  {user.email}
                </Text>
            </div>

            {/* USERNAME INPUT */}
            <Group mb="sm">
              <Text size="sm">Username</Text>
              <TextInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                size="xs"
                style={{ flex: 1 }}
              />
              <Button 
                onClick={() => handleUsernameChange(username)} 
                loading={isLoading} 
                size="xs"
              >
                Save
              </Button>
            </Group>

              <UserXPIndicator user={user} />
              <Divider my="sm" />
              </>
            )}


            

            <Stack>
              <Button variant="light" leftSection={<IconHome2 size={18} />} onClick={() => {
                navigate("/");
                toggle();
              }}>
                Home
              </Button>
            <Button variant="light" leftSection={<IconCards size={18} />} onClick={() => {
                navigate("/decks");
                toggle();
              }}>
              All Decks
            </Button>
            <Button variant="light" leftSection={<IconPlus size={18} />} onClick={() => {
                navigate("/decks/new");
                toggle();
              }}>
              Create Deck
            </Button>

            {user ? (
              <Button
                leftSection={<IconLogout size={18} />}
                onClick={() => {
                  handleLogout();
                  toggle();
                }}
                variant="light"
              >
                Logout
              </Button>
            ) : (
              <Button
                leftSection={<IconLogin size={18} />}
                onClick={() => {
                  navigate("/login");
                  toggle();
                }}
                variant="light"
              >
                Login
                </Button>
              )}
            </Stack>
          </div>
        </ScrollArea>
        <Text ta="center" mt="md" size="s">
          Made with 💻 from Vienna
        </Text>
      </AppShell.Navbar>

      {/* MAIN CONTENT AREA */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
