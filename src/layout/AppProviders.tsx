"use client";

import { useState, type ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const themeConfig = {
  token: {
    colorPrimary: "#4f46e5",
    colorInfo: "#4f46e5",
    colorLink: "#4f46e5",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    borderRadius: 14,
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorBgContainer: "#ffffff",
    colorBorder: "#e2e8f0",
  },
  components: {
    Button: {
      controlHeightLG: 48,
      fontWeight: 600,
      borderRadiusLG: 14,
      primaryShadow: "0 6px 20px rgba(79, 70, 229, 0.28)",
    },
    Card: {
      borderRadiusLG: 22,
      colorBorderSecondary: "#e2e8f0",
      boxShadowSecondary:
        "0 12px 32px -8px rgba(15, 23, 42, 0.06), 0 4px 12px -4px rgba(15, 23, 42, 0.03)",
    },
    Input: {
      controlHeightLG: 48,
      borderRadiusLG: 14,
    },
    Select: {
      controlHeightLG: 48,
      borderRadiusLG: 14,
    },
    Tag: {
      borderRadiusSM: 8,
    },
  },
};

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <AntdRegistry>
      <ConfigProvider theme={themeConfig}>
        <AntdApp>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  );
}
