import { Text } from "@mantine/core";

const tempCalls = { callsAnswered: 32, totalCalls: 50 };
const tempContacts = { contactsAnswered: 56, contactsCalls: 80 };
// Make sure to use the variable later and not the dummy values // 
export default function CallsContactMade({
  callsToday,
  contactsToday,
  totalCallsToday,
  totalContactsToday,
}: {
  callsToday?: number;
  contactsToday?: number;
  totalCallsToday?: number;
  totalContactsToday?: number;
}) {
  return (
    <>
      <div>
        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
          calls made (day)
        </Text>
        <Text fw={700} fz="xl">
          {tempCalls.callsAnswered.toString() +
            "/" +
            tempCalls.totalCalls.toString()}
        </Text>
      </div>

      <div>
        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
          contacts made (day)
        </Text>
        <Text fw={700} fz="xl">
          {tempContacts.contactsAnswered.toString() +
            "/" +
            tempContacts.contactsCalls.toString()}
        </Text>
      </div>
    </>
  );
}
