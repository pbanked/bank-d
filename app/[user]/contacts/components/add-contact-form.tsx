"use client";
import React, { useState } from "react";
import {
  Paper,
  Text,
  Group,
  TextInput,
  NumberInput,
  Select,
  Button,
  Collapse,
} from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";

import { AddContactFormProps } from "../types";

export default function AddContactForm({
  isOpen,
  onCancel,
  onSubmit,
}: AddContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "" as number | string,
    party: "Independent",
  });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.phoneNumber) return;

    onSubmit({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      age:
        typeof formData.age === "number"
          ? formData.age
          : parseInt(formData.age as string) || 0,
      party: formData.party,
    });

    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
      party: "Independent",
    });
  };

  return (
    <Collapse in={isOpen}>
      <Paper withBorder p="md" mb="lg" radius="md" shadow="sm">
        <Text fw={600} mb="sm">
          New PhoneBook Entry
        </Text>
        <Group align="flex-end" grow>
          <TextInput
            label="First Name"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <TextInput
            label="Phone"
            placeholder="555-0000"
            required
            leftSection={<IconPhone size={14} />}
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </Group>
        <Group align="flex-end" grow mt="sm">
          <NumberInput
            label="Age"
            placeholder="Age"
            min={18}
            max={120}
            value={formData.age}
            onChange={(val) => setFormData({ ...formData, age: val })}
          />
          <Select
            label="Party"
            data={[
              "Democrat",
              "Republican",
              "Independent",
              "Green",
              "Libertarian",
            ]}
            value={formData.party}
            onChange={(val) =>
              setFormData({ ...formData, party: val || "Independent" })
            }
            allowDeselect={false}
          />
          <Button onClick={handleSubmit} color="green">
            Save Entry
          </Button>
        </Group>
      </Paper>
    </Collapse>
  );
}
