import { AppShell, Burger, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const headerHeight = theme.other.headerHeight;

    return (
        <AppShell
            header={{ height: headerHeight }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />

                <div>Knowledge Graph</div>
            </AppShell.Header>

            <AppShell.Navbar>Navbar</AppShell.Navbar>

            <AppShell.Main h={`calc(100vh - ${headerHeight}px)`}>{children}</AppShell.Main>
        </AppShell>
    );
}