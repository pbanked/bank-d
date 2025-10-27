"use client";

import {
  IconBook,
  IconCalculator,
  IconHome2,
  IconLayout,
  IconPhone,
  IconSettings,
  IconTargetArrow,
  IconUser,
} from "@tabler/icons-react";
import { Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconLayout, label: "Dashboard", path: "/dashboard" },
  { icon: IconPhone, label: "Calls", path: "/call" },
  { icon: IconCalculator, label: "Calendar", path: "/calendar" },
  { icon: IconBook, label: "Contact", path: "/contacts" },
  { icon: IconUser, label: "User", path: "/people" },
  { icon: IconTargetArrow, label: "Analytics", path: "/analytics" },
];

export function Navbar() {
  const activePath = usePathname();
  const router = useRouter()
  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={activePath === link.path}
      onClick={() => router.push(link.path)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSettings} label="Settings" onClick={() => router.push('/settings')} />
      </Stack>
    </nav>
  );
}
