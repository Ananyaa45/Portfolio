import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Ananyaa Maity | Portfolio",
  description: "Personal portfolio of Ananyaa Maity - UI/UX Designer, Frontend Developer, and ML Model Builder studying at IIEST Shibpur.",
  keywords: ["Ananyaa Maity", "Portfolio", "UI/UX Designer", "Frontend Developer", "Machine Learning", "IIEST Shibpur"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
