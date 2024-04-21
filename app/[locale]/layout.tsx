import "@/app/globals.css";
// import { Inter } from 'next/font/google'

export const metadata = {
  title: "ObChain",
  description:
    "ObChain is a decentralized blockchain platform that provides a secure, scalable, and user-friendly environment for businesses to transact and exchange digital assets.",
};

// export default function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   return (
//     <html lang={locale}>
//       <body>{children}</body>
//     </html>
//   );
// }

import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <Toaster />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
