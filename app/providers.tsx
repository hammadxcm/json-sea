'use client';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

export const lightTheme = createTheme({
  type: 'light',
  theme: {
    letterSpacings: {
      tighter: '0',
      tight: '0',
      normal: '0',
      wide: '0',
      wider: '0',
      widest: '0',
    },
  },
});

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    letterSpacings: {
      tighter: '0',
      tight: '0',
      normal: '0',
      wide: '0',
      wider: '0',
      widest: '0',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 20, // 20 seoncds
      gcTime: 1000 * 60 * 5, //  5 minutes
    },
  },
});

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem
      attribute="class" // With 'class' `attribute` prop, you don't need to pass `theme` prop to <NextUIProvider>.
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
};

export default Providers;
