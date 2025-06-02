"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Plus_Jakarta_Sans } from "next/font/google";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inside your RootLayout component

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";
    const portalRoot = document.getElementById("portal-root");
    if (portalRoot) {
      portalRoot.appendChild(script);
    }

    return () => {
      // Clean up the script when the component unmounts
      portalRoot?.removeChild(script);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        <div id="portal-root" className="grid"></div>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <main>{children}</main>
          {/* </PersistGate> */}
        </Provider>
      </body>
    </html>
  );
}
