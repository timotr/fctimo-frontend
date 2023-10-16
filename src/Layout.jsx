import "@mantine/core/styles.css";
import { AppShell, Burger, Divider, Group, Stack } from '@mantine/core';
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import useGlobalState from "./components/hooks/useGlobalState";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const actionBarTitle = useGlobalState((state) => state.actionBarTitle);
  const actionBarButtons = useGlobalState((state) => state.actionBarButtons);

  return <AppShell
    header={{ height: 60 }}
    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    padding="md"
    layout="alt"
  >
    <AppShell.Header p="md">
      <Group justify="space-between" align="center">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="flex-end" style={{ flex: 1 }}>
          <Group>
            <div>{actionBarTitle}</div>
            <div>{Object.values(actionBarButtons)}</div>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>

    <AppShell.Navbar p="md">
      <Group justify="flex-start" align="center">
        <Burger opened={opened} onClick={toggle} hidden={!isMobile} size="sm" />
        <div>Football Club</div>
      </Group>
      <Stack mt="lg">
        <Link to="/">Training</Link>
        <Link to="/players">Players</Link>
        <Link to="/">Teams</Link>
        <Divider />
        <Link to="/">Guardians</Link>
        <Link to="/">Payments</Link>
      </Stack>
    </AppShell.Navbar>

    <AppShell.Main><Outlet /></AppShell.Main>
  </AppShell>
}