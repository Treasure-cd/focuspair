import type { Metadata } from "next";
import { Source_Sans_3, Merriweather, Cabin } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Toast from "@/components/ui/Toast";
import { getMe } from "@/app/actions/user"


// type Props<As extends React.ElementType = "a"> = 
//   { as: As } &
//   React.ComponentProps<As> &
//   React.PropsWithChildren;

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"]
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"]
})


export const metadata: Metadata = {
  title: "StudySync",
  description: "An online study platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const user = await getMe();
  console.log("Layout rendered");




  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSans.variable} ${merriweather.variable} ${cabin.variable} antialiased`}
      >
      <Providers user={user}>
        <Navbar />
        {children}
         <Toast />
      </Providers>
        
  
      </body>
    </html>
  );
}
