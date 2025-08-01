"use client";

import { Text, Title, Button } from "@mantine/core";
import { IconTools } from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
        <div className="flex justify-center mb-4">
          <IconTools size={48} stroke={1.5} className="text-blue-600" />
        </div>
        <Title order={2} className="text-black text-2xl font-bold mb-2">
          We're Under Construction
        </Title>
        <Text className="text-gray-600 mb-4">
          Our website is currently undergoing scheduled updates.
          <br />
          We'll be back shortly. Thank you for your patience!
        </Text>
        <div className="mb-4">
          <Image
            src="/under-construction.png"
            alt="Under Construction"
            width={320}
            height={200}
            className="rounded-lg mx-auto shadow-md"
          />
        </div>
        <Button
          variant="light"
          component="a"
          href="mailto:joeulam@bu.edu"
          className="mt-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Contact Us
        </Button>
      </div>
    </main>
  );
}
