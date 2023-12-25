import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "@/components/TanstackProvider/TanstackProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Banks",
  description: "Test task for synergyway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="bottom-left" theme="dark" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
