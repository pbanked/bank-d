"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react";
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
    email: "",
    address: "",
    city: "",
    state: "",
    age: "" as number | string,
    party: "Independent",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        age: "",
        party: "Independent",
      });
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!formData.firstName || !formData.phoneNumber) return;

    onSubmit({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      age:
        typeof formData.age === "number"
          ? formData.age
          : parseInt(formData.age as string) || 0,
      party: formData.party,
    });
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onCancel}
      title="New Contact Entry"
      size="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md">
        <Group grow align="flex-start">
          <TextInput
            label="First Name"
            placeholder="Jane"
            required
            data-autofocus
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Group>

        <Group grow align="flex-start">
          <TextInput
            label="Phone"
            placeholder="555-0123"
            required
            leftSection={<IconPhone size={14} />}
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <TextInput
            label="Email"
            placeholder="jane@example.com"
            leftSection={<IconMail size={14} />}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Group>

        <Group grow align="flex-start">
          <NumberInput
            label="Age"
            placeholder="35"
            min={18}
            max={120}
            value={formData.age}
            onChange={(val) => setFormData({ ...formData, age: val })}
          />
          <Select
            label="Party Affiliation"
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
        </Group>

        <TextInput
          label="Street Address"
          placeholder="123 Main St, Apt 4B"
          leftSection={<IconMapPin size={14} />}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <Group grow align="flex-start">
          <TextInput
            label="City"
            placeholder="Springfield"
            leftSection={<IconBuilding size={14} />}
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />
          <TextInput
            label="State"
            placeholder="IL"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </Group>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="blue">
            Save Contact
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}