import { SearchProvider } from "./context/SearchContext";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://stayings.com"),
  title: {
    default: "Staying.com | Stays, Flights, Cars & Airport Taxis",
    template: "%s | Staying.com",
  },
  description:
    "Book stays, flights, car rentals, and airport taxis with Staying.com. Compare options, find great prices, and plan your trip with confidence.",
  keywords: [
    "Staying.com",
    "hotel booking",
    "stays",
    "flights",
    "car rental",
    "airport taxi",
    "travel booking",
    "Saudi Arabia travel",
  ],
  applicationName: "Staying.com",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://stayings.com",
    siteName: "Staying.com",
    title: "Staying.com | Stays, Flights, Cars & Airport Taxis",
    description:
      "Book stays, flights, car rentals, and airport taxis with Staying.com.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staying.com | Stays, Flights, Cars & Airport Taxis",
    description:
      "Book stays, flights, car rentals, and airport taxis with Staying.com.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "travel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SearchProvider>
        <body>{children}</body>
      </SearchProvider>
    </html>
  );
}
