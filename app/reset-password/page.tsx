"use client";

import {
  Anchor,
  Button,
  Paper,
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
import resetPasswordForEmail from "@/utils/auth/reset-password";


export default function Page() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: "", 
        },
        validate: (values) => {
            const errors: {[key: string]: string} = {};
            if (!/^\S+@\S+$/.test(values.email)) {
                errors.email = "Invalid email";
              }
              return errors;
            },
    })

    const handleSubmit = async (values: {email: string }) => {
      const { error } = await resetPasswordForEmail(values.email);

        if (error) {
          notifications.show({
            title: "Reset Failed",
            message: error.message,
            color: "red",
          });
        } else {
          notifications.show({
            title: "Email sent",
            message: "Check your inbox for reset link",
            color: "green",
          });
        }
      };
      

    return (
    <Center mih="100vh">
      <Paper miw={400} mih={375} radius="lg" p="3vw" m="3vw" shadow="md" withBorder>
        <Text size="28px" fw={600} mt="40" mb="50">
          Forgot your password
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            
            <TextInput
              required
              label="Email"
              withAsterisk
              size="md"
              placeholder="email@provider.com"
              {...form.getInputProps("email")}
            />

            <Button variant="filled" type="submit" radius="sm" size="md" mb="md">
              send link
            </Button>
            <Anchor
              component="button"
              underline="never"
              fs="italic"
              onClick={() => router.push("/login")}
            >
            return
            </Anchor>

          </Stack>
        </form>
        
      </Paper>
    </Center>
  );
}

