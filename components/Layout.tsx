import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  pageTitle?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  pageTitle = "Default page",
}: Props) => (
  <div className="bg-gray-100 min-h-screen">
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="description" content="VulcanWM's GuestBook" />
      <meta property="og:image" content="/logo.png" />
      <meta name="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={title} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="Website" />
      <title>{pageTitle}</title>
    </Head>
    <main className="container mx-auto p-4">{children}</main>
  </div>
);

export default Layout;
