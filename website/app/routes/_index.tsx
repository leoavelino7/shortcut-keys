import type { FC, ReactNode } from "react";
import { Fragment } from "react";
import { Header } from "~/components/Header";

const getExample = (project: string) =>
  `https://github.com/leoavelino7/shortcut-keys/tree/main/examples/${project}`;

const examples = [
  {
    title: "HTML 5",
    to: getExample("html-example"),
    image: "/html.svg",
    description: "Simple project using HTML 5",
  },
  {
    title: "ReactJS",
    to: getExample("react-example"),
    image: "/reactjs.svg",
    description: "Simple project using ReactJS",
  },
  {
    title: "Remix",
    to: getExample("remix-example"),
    image: "/remix.svg",
    description: "Simple project using Remix",
  },
  {
    title: "NextJS",
    to: getExample("nextjs-example"),
    image: "/nextjs.svg",
    description: "Simple project using NextJS",
  },
];

type CodeTypeProps = {
  children: ReactNode;
};

const CodeType: FC<CodeTypeProps> = ({ children }) => (
  <span className="inline bg-purple-900 bg-opacity-80 text-sm text-white mx-1 p-1 rounded-md">
    {children}
  </span>
);

export default function Index() {
  return (
    <main>
      <Header
        title={
          <Fragment>
            Your most <br /> accessible application
          </Fragment>
        }
        description={
          <Fragment>
            Make it easy for your user to perform actions <br /> in your app by
            adding shortcuts.
          </Fragment>
        }
        linkTo="/#quick-examples"
        linkText="See quick examples"
      />

      <section
        id="documentation"
        className="flex flex-col relative w-full px-5 py-32 bg-gray-50"
      >
        <div className=" mx-auto max-w-7xl w-full">
          <div className="flex flex-col-reverse">
            <h2 className="text-4xl md:text-5xl leading-snug text-black font-bold capitalize">
              Documentation
            </h2>
            <h3 className="text-gray-900 font-medium uppercase text-md">
              Features and support
            </h3>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <section>
              <hgroup>
                <h4 className="text-xl font-bold">Add event to element</h4>
                <p className="text-gray-800 font-medium mt-1">
                  <b>Function:</b>
                  <CodeType>add(shortcut, handler, options)</CodeType>
                </p>
              </hgroup>
              <ul className="flex flex-col gap-3 mt-4 ml-5 text-md md:text-lg list-disc">
                <li>
                  <b>
                    shortcut <span aria-label="Required">*</span>{" "}
                  </b>
                  - Shortcut to trigger action.
                </li>
                <li>
                  <b>
                    handler <span aria-label="Required">*</span>{" "}
                  </b>
                  - Action triggered when shortcut is pressed.
                </li>
                <li>
                  <b>options </b>- Extra settings
                  <ul className="flex flex-col gap-3 mt-4 ml-5 text-md md:text-lg">
                    <li>
                      <b>description</b> - Event description
                    </li>
                    <li>
                      <b>multiPlatform</b> - When true, 'control' and 'command'
                      are enabled together.
                    </li>
                    <li>
                      <b>prevent</b> - When true, activates{" "}
                      <CodeType>event.preventDefault()</CodeType>.
                    </li>
                    <li>
                      <b>eventType</b> - Sets event type.{" "}
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/Events"
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-800 hover:brightness-125 focused"
                      >
                        See more events
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
            <hr className="w-full h-1 border-none rounded-lg bg-gray-200" />
            <section>
              <hgroup>
                <h4 className="text-xl font-bold">Remove existing event</h4>
                <p className="text-gray-800 font-medium mt-1">
                  <b>Function:</b> <CodeType>remove(shortcut)</CodeType>
                </p>
              </hgroup>
              <ul className="flex flex-col gap-3 mt-4 ml-5 text-md md:text-lg list-disc">
                <li>
                  <b>
                    shortcut <span aria-label="Required">*</span>{" "}
                  </b>
                  - Shortcut to be removed.
                </li>
              </ul>
            </section>
            <hr className="w-full h-1 border-none rounded-lg bg-gray-200" />
            <section>
              <hgroup>
                <h4 className="text-xl font-bold">
                  Remove all existing events
                </h4>
                <p className="text-gray-800 font-medium mt-1">
                  <b>Function:</b> <CodeType>removeAll()</CodeType>
                </p>
              </hgroup>
            </section>
            <hr className="w-full h-1 border-none rounded-lg bg-gray-200" />
            <section>
              <hgroup>
                <h4 className="text-xl font-bold">List all existing events</h4>
                <p className="text-gray-800 font-medium mt-1">
                  <b>Function:</b> <CodeType>list()</CodeType>
                </p>
              </hgroup>

              <ul className="flex flex-col gap-3 mt-4 ml-5 text-md md:text-lg list-disc">
                <li>
                  <b>key</b> - Shortcut to trigger action.
                </li>
                <li>
                  <b>info</b> - All information about the shortcut.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-between w-full paper-reverse pt-10">
        <section
          id="quick-examples"
          className="flex flex-col justify-center relative w-full min-h-screen m-auto max-w-7xl py-32 px-5"
        >
          <div className="grid grid-cols-2 gap-20 items-center">
            <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
              <div className="flex flex-col-reverse">
                <h2 className="text-4xl md:text-5xl leading-snug text-white capitalize">
                  Quick examples
                </h2>
                <h3 className="text-white font-medium uppercase text-md">
                  How install Shortcut keys ?
                </h3>
              </div>
              <div className="mt-4">
                <p className="text-md md:text-lg text-white">
                  Installing and using <b>shortcut-keys</b> is very easy. And to
                  make your life even easier, here are some working examples.
                </p>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-10">
              {examples.map((example) => (
                <div
                  key={example.to}
                  className="flex flex-col justify-center items-center col-span-2 md:col-span-1 shadow-md rounded-lg py-10 px-2 bg-gray-100 bg-opacity-10"
                >
                  <div className="flex flex-col justify-center items-center rounded-full w-20 h-20 bg-gray-200">
                    <img
                      loading="lazy"
                      src={example.image}
                      alt={example.title}
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="font-bold mt-4 text-gray-100 text-md">
                    {example.title}
                  </h3>
                  <p className="text-gray-100 text-center">
                    {example.description}
                  </p>
                  <a
                    href={example.to}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-sm text-gray-100 bg-primary font-medium py-2 px-6 rounded-full transition-all duration-75 ease-linear hover:brightness-75 focused"
                  >
                    Open example
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer className="text-white border-solid border-t-2 border-gray-100 border-opacity-10 px-5">
          <div className="flex flex-row items-center justify-between relative w-full m-auto max-w-7xl py-6">
            <p>Developed by Leonardo Avelino - 2021</p>
            <div>
              <a
                href="https://github.com/leoavelino7/shortcut-keys"
                target="_blank"
                rel="noreferrer"
                className="flex focused"
              >
                <span className="sr-only">Github - Shortcut keys</span>
                <img loading="lazy" src="/github.svg" alt="Github" width={32} height={32} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
