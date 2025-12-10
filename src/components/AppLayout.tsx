import { AppShell, Burger, Flex, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface AppLayoutProps {
    children: React.ReactNode;
    aside?: React.ReactNode;
    headerControls?: React.ReactNode;
}

export default function AppLayout({ children, aside, headerControls }: AppLayoutProps) {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const headerHeight = theme.other.headerHeight;

    return (
        <AppShell
            header={{ height: headerHeight }}
            aside={{
                width: 350,
                breakpoint: 'md',
                collapsed: { mobile: true, desktop: false },
            }}
        >
            <AppShell.Header role="banner">
                <Flex h="100%" align="center" justify="space-between" pl="md" pr="md">
                    <Title order={4}>Valkyrie Graph Explorer</Title>
                    {headerControls && <div>{headerControls}</div>}
                </Flex>
            </AppShell.Header>

            {aside && <AppShell.Aside>{aside}</AppShell.Aside>}

            <AppShell.Main h={`calc(100vh - ${headerHeight}px)`}>{children}</AppShell.Main>
        </AppShell>
    );
}