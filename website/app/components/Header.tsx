import { Link } from "@remix-run/react";
import type { FC, ReactNode } from "react";

const links = [
  { to: "/#quick-examples", text: "Quick examples" },
  { to: "/#documentation", text: "Documentation" },
];

type HeaderProps = {
  title: ReactNode;
  description: ReactNode;
  linkTo: string;
  linkText: string;
};

export const Header: FC<HeaderProps> = ({
  title,
  description,
  linkText,
  linkTo,
}) => {
  return (
    <div className="et-wrapper">
      <div className="et">
        <div className="galaxy"></div>
        <div className="flex flex-col paper min-h-screen pb-10">
          <header className="relative flex flex-col md:flex-row justify-between px-5 py-10 w-full mx-auto max-w-7xl">
            <p className="uppercase font-bold text-xl text-white mb-2 md:mb-0 mt-1 z-10">
              <Link to="/" className="focused">Shortcut keys</Link>
            </p>
            <nav>
              <ul className="menu flex flex-row gap-x-10 z-10">
                {links.map((link) => (
                  <li
                    key={link.to}
                    className="text-white uppercase text-sm font-medium relative py-2 no-underline border-none"
                  >
                    <Link to={link.to} className="focused">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <section className="relative w-full m-auto max-w-7xl px-5 z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
              <div className="col-span-2 md:col-span-1 flex flex-col items-start">
                <h2 className="text-5xl md:text-6xl font-bold text-white capitalize md:leading-[68px]">
                  {title}
                </h2>
                <p className="text-white text-lg md:text-xl mt-4">
                  {description}
                </p>
                <div className="flex flex-row gap-4 mt-8">
                  <Link
                    to={linkTo}
                    className="text-black text-md md:text-lg bg-white font-medium py-5 px-6 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl transition-all duration-75 ease-linear hover:brightness-75 focused"
                  >
                    {linkText}
                  </Link>
                </div>
              </div>
              <div className="col-span-2 md:col-span-2 flex justify-end">
                <img
                  src="/et.svg"
                  className="et-image my-10 md:my-0"
                  alt=""
                  width="90%"
                  height="100%"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
