"use client";
import { MantineProvider, MantineTheme } from "@mantine/core";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      defaultColorScheme="light" 
      theme={{primaryColor: "customTeal", 
        colors: {
          customTeal: [
          "#e6f8fa", 
          "#b3e3e7",
          "#80ced3",
          "#4db8c0", 
          "#1aa3ac", 
          "#06829B",
          "#056e85", 
          "#045a6f", 
          "#03475a", 
          "#023344",
          ],
        },
        components: {
          Button: {
            styles: (theme: MantineTheme) => ({
              filled: {
                backgroundColor: theme.colors.customTeal[5],
                borderColor: theme.colors.customTeal[5],
                color: theme.white,
                "&:hover": {
                  backgroundColor: theme.colors.customTeal[6],
                  borderColor: theme.colors.customTeal[6],
                },
              },
            }),
          },

        },
    }}
    >
      {children}
    </MantineProvider>
    );
}