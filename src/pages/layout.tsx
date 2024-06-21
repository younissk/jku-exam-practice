import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

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
              <Link to="/about">About</Link>
              <Link to="/exam-request">Request an Exam</Link>
              <Link to="/feature-request">Request a Feature</Link>
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
            <Link to="/exam-request">Request an Exam</Link>
            <Link to="/feature-request">Request a Feature</Link>
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
