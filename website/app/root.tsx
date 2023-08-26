import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Fragment } from "react";
import { Header } from "./components/Header";

import styles from "./styles/dist.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Shortcut Keys - Documentation" },
    { name: "og:title", content: "Shortcut Keys - Documentation" },
    {
      name: "og:description",
      content: "A simple Javascript utility to create keyboard shortcuts.",
    },
    { name: "og:type", content: "website" },
    { name: "og:url", content: "https://shortcut-keys.vercel.app/" },
    {
      name: "og:image",
      content: "https://shortcut-keys.vercel.app/thumbnail.webp",
    },
    {
      name: "og:image:alt",
      content:
        "Make it easy for your user to perform actions in your app by adding shortcuts.",
    },
    { name: "og:image:type", content: "image/webp" },
    { name: "og:image:width", content: "1200" },
    { name: "og:image:height", content: "525" },
    { name: "og:site_name", content: "Shortcut Keys" },
    { name: "og:locale", content: "en" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@leoavelino7" },
    { name: "twitter:title", content: "Shortcut Keys - Documentation" },
    {
      name: "twitter:description",
      content: "A simple Javascript utility to create keyboard shortcuts.",
    },
    {
      name: "twitter:image",
      content: "https://shortcut-keys.vercel.app/thumbnail.webp",
    },
    {
      name: "description",
      content: "A simple Javascript utility to create keyboard shortcuts.",
    },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "msapplication-TileColor", content: "#ffffff" },
    { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
    { name: "theme-color", content: "#ffffff" },
    { charSet: "utf-8" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ];
};

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header
          title={
            <Fragment>
              <span aria-hidden="true">😞</span> Sorry ! <br />{" "}
              <span className="text-5xl">Page not found</span>
            </Fragment>
          }
          description={
            <Fragment>
              The page you are trying to access does not exist.
            </Fragment>
          }
          linkTo="/"
          linkText="Go to documentation"
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
