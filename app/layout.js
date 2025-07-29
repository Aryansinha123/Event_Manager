// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Head from "next/head";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Evently - Explore Amazing Events",
//   description: "Discover and register for exciting events near you.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//        <Head>
//         <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
//         <link rel="icon" href="/favicon.ico" sizes="any" /> {/* fallback */}
//       </Head>
//       <head>
//         {/* Add Material Icons Link */}
//         <link
//           href="https://fonts.googleapis.com/icon?family=Material+Icons"
//           rel="stylesheet"
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* <Navbar /> */}
//         <div className=" mx-auto">{children}</div>
//       </body>
//     </html>
//   );
// }
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventEase - Explore Amazing Events",
  description: "Discover and register for exciting events near you.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      // { url: '/favicon.ico', sizes: 'any' }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Analytics />
      
      <head>
        {/* Add Material Icons Link */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto">{children}</div>
      </body>
    </html>
  );
}