"use client";

import { GoogleButton } from "@/components/google-button";
import { userLogin } from "@/utils/auth/user-login";

import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export default function Page() {
  const router = useRouter();
  const form = useForm({
    initialValues: { email: "", password: "", terms: true },
    validate: {
      email: (v: string) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v: string) =>
        v.length <= 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const login = async (values: { email: string; password: string }) => {
    const error = await userLogin(values.email, values.password, router);
    if (error) {
      notifications.show({
        title: "Login Failed",
        message: error,
        color: "red",
      });
    }
  };
  return (
    <Center mih="100vh">
      <Paper maw={560} w="100%" radius="md" p="5vw" withBorder>
        <Text size="50px" fw={500}>
          Log in
        </Text>

        <form onSubmit={form.onSubmit(login)}>
          <Stack className="mt-10">
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
            <Button type="submit" radius="xl">
              Log in with Email
            </Button>
            <GoogleButton radius="xl">Google</GoogleButton>
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push("/signup")}
            >
              Don&apos;t have an account? Sign-up Here
            </Anchor>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
