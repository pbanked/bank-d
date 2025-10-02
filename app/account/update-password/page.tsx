"use client";

import {
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
import updatePassword from "@/utils/auth/reset-password";


export default function Page() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: {[key: string]: string} = {};
            if (values.password.length < 6) {
                errors.password = "Password should include at least 6 characters";
            }
            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords do not match";
            }
              return errors;
            },
    })

    const handleSubmit = async (values: {password: string}) => {
      const { error } = await updatePassword(values.password);

        if (error) {
          notifications.show({
            title: "Reset Failed",
            message: error.message,
            color: "red",
          });
        } else {
          notifications.show({
            title: "Password Successfully Resetted",
            message: "You can now sign in with your new password.",
            color: "green",
          }
         
        );
        router.push("/login");
        }
      };
      

    return (
    <Center mih="100vh">
      <Paper miw={375} mih={400} radius="lg" p="3vw" m="3vw" shadow="md" withBorder>
        <Text size="28px" fw={600} mt="40" mb="30">
          Reset Password
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Enter new password"
              withAsterisk
              size="md"
              placeholder=""
              {...form.getInputProps("password")}
            />
            <TextInput
              required
              label="Confirm new password"
              withAsterisk
              size="md"
              placeholder=""
              {...form.getInputProps("confirmPassword")}
            />

            <Button variant="filled" type="submit" radius="sm" size="md" mb="md">
                confirm
            </Button>

          </Stack>
        </form>
      </Paper>
    </Center>
  );
}

