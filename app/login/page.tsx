"use client";

import { GoogleButton } from "@/components/google-button";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export default function Page(props: PaperProps) {
  const form = useForm({
    initialValues: { email: "", password: "", terms: true },
    validate: {
      email: (v: string) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v: string | any[]) =>
        v.length <= 6 ? "Password should include at least 6 characters" : null,
    },
  });
  const router = useRouter();
  return (
    <Center mih="100vh">
      <Paper maw={560} w="100%" radius="md" p="lg" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Bankd,
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="email@provider.com"
              value={form.values.email}
              onChange={(e) =>
                form.setFieldValue("email", e.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(e) =>
                form.setFieldValue("password", e.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push("/signup")}
            >
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
