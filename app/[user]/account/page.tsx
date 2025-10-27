"use client";
import {
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Center,
  Divider,
  Title,
  Avatar,
  Group,
  FileButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import getCurrentUser from "@/functions/get-user";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import updateUserInfo from "@/functions/update-user-info";
import uploadProfileImg from "@/functions/upload-profile-img";
import retrieveUserImage from "@/functions/retrieve-image";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";

export default function SettingsPage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data } = await getCurrentUser();
      if (data) {
        const { firstName, lastName, avatarUrl, email } = data;
        form.setValues({ firstName, lastName, email });
        form.resetDirty({ firstName, lastName, email });
        setAvatarUrl(avatarUrl || null);
      }
      // throw error in ui
    }
    getUser();
  }, []);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!/^\S+@\S+$/.test(values.email)) {
        errors.email = "Invalid email";
      }
      if (values.firstName.trim().length === 0) {
        errors.firstName = "First name is required";
      }
      if (values.lastName.trim().length === 0) {
        errors.lastName = "Last name is required";
      }
      return errors;
    },
  });
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const updatedFields: Partial<User> = {};
    if (form.isDirty("firstName")) {
      updatedFields.firstName = values.firstName;
    }
    if (form.isDirty("lastName")) {
      Object.assign(updatedFields, { lastName: values.lastName });
    }
    if (form.isDirty("email")) {
      Object.assign(updatedFields, { email: values.email });
    }
    const { data, error } = await updateUserInfo(updatedFields);
    if (error) {
      console.error("Error updating user:", error);
    } else if (!error && data) {
      form.setValues({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      form.resetDirty({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    }
  };

  const resetChanges = () => {
    form.reset();
  };
  const handleAvatarUpload = async (file: File | null) => {
    if (!file) {
      return;
    }
    const path = await uploadProfileImg(file);
    if (!path || typeof path !== "string") {
      throw new Error("Upload failed!");
    }

    const publicUrl = retrieveUserImage(path);
    setAvatarUrl(publicUrl);
    const { error } = await updateUserInfo({ avatarUrl: publicUrl });
    if (error) {
      throw new Error("Failed to update profile");
    }
  };

  return (
    <>
      <div style={{ flex: 1, marginLeft: 80, padding: "2rem", width: "90%" }}>
        <Header headerTitle={"Account Settings"} />
      </div>
      <Center>
        <Stack>
          <Paper
            w="100%"
            maw={900}
            mah={350}
            radius="lg"
            p="3vw"
            m="5vw"
            shadow="md"
          >
            <Group align="flex-start" justify="space-between">
              <Stack>
                <Text fw={600} fz={24}>
                  {" "}
                  Basic Information
                </Text>
                <Divider w={190} />

                <Center style={{ flexDirection: "column", gap: "2vh" }}>
                  <Avatar src={avatarUrl} radius="xl" size="xl"></Avatar>
                  <FileButton
                    onChange={handleAvatarUpload}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Text {...props} c="customTeal.6" fz={14}>
                        Edit
                      </Text>
                    )}
                  </FileButton>
                </Center>
              </Stack>

              <Stack w="70%" mt={60}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Group grow wrap="wrap" gap="sm">
                    <TextInput
                      size="md"
                      label="First Name"
                      {...form.getInputProps("firstName")}
                    />
                    <TextInput
                      size="md"
                      label="Last Name"
                      {...form.getInputProps("lastName")}
                    />
                  </Group>

                  <TextInput
                    size="md"
                    label="Email"
                    {...form.getInputProps("email")}
                  />
                  <Group mt="md">
                    <Button
                      size="md"
                      variant="light"
                      color="gray"
                      onClick={resetChanges}
                    >
                      Cancel
                    </Button>
                    <Button size="md" type="submit" color="customTeal.5">
                      Save
                    </Button>
                  </Group>
                </form>
              </Stack>
            </Group>
          </Paper>
          <Stack>
            <Paper
              w="100%"
              mah={300}
              maw={900}
              radius="lg"
              p="3vw"
              m="5vw"
              shadow="lg"
              bg="white"
            >
              <Text fw={600} fz={24}>
                {" "}
                Change Password
              </Text>
              <Divider w={200} mb={20} />
              <Text fz=""> Get a secure link to update your password!</Text>
              <Button
                size="md"
                mt={10}
                color="customTeal.5"
                onClick={() => router.push("/account/update-password")}
              >
                Update Password
              </Button>
            </Paper>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
