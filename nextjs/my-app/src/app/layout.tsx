import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/Header";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LCO Systems",
  description: "Sistemas LCO para internete",
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRootLayout extends Readonly<{ children: React.ReactNode }> { }

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        <Header></Header>
        {children}</body>
    </html>
  );
}
