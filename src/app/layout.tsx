import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
});

export const viewport: Viewport = {
  themeColor: "#0f081c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "麻瓜專用 AI 外掛 | 你的無腦求生指南",
  description: "將複雜的「提示詞」封裝成一鍵釋放的魔法。應付奧客、推掉飯局、自動寫報告，解救所有不擅長 AI 的麻瓜。",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "麻瓜專用 AI 外掛",
  },
  icons: {
    apple: "/icon-512x512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                // Ensure only one reload per session to prevent loops
                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                  if (refreshing) return;
                  refreshing = true;
                  window.location.reload();
                });

                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(registration => {
                    registration.onupdatefound = () => {
                      const installingWorker = registration.installing;
                      if (installingWorker) {
                        installingWorker.onstatechange = () => {
                          if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                              // New version installed, skipWaiting is handled in sw.js
                              // controllerchange will trigger the reload
                              console.log('New content available, refreshing...');
                            } else {
                              console.log('Content is cached for offline use.');
                            }
                          }
                        };
                      }
                    };
                  }).catch(error => {
                    console.error('Service worker registration failed:', error);
                  });
                });
              }
            `,
          }}
        />

      </body>
    </html>
  );
}
