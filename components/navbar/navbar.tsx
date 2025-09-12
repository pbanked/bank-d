"use client";

import { useState } from "react";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
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
  { icon: IconHome2, label: "Home", path: "/home" },
  { icon: IconGauge, label: "Dashboard", path: "/dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", path: "/analytics" },
  { icon: IconSettings, label: "Settings", path: "/settings" },
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
      <Center></Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
