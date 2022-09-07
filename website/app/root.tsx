import type { MetaFunction } from "@remix-run/node";
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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Shortcut Keys - Documentation",
  description: "A simple Javascript utility to create keyboard shortcuts.",
  viewport: "width=device-width,initial-scale=1",
});

export function CatchBoundary() {
  return (
    <html>
      <head>
        <title>Shortcut Keys - Oops! Page not found</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <Header
            title={
              <Fragment>
                <span aria-hidden="true">😞</span> Sorry ! <br /> <span className="text-5xl">Page not found</span>
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
        </main>
        <Scripts />
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
