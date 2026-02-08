import "./globals.css";

export const metadata = {
  title: "Staying.com | Find your next stay",
  description: "Search deals on hotels, homes, and much more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
