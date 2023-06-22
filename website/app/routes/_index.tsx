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
  <span className="inline bg-gray-200 text-gray-800 mx-1 py-1 px-2 rounded-md">
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
          <div className="flex flex-col gap-10 mt-10">
            <div>
              <h4 className="text-xl">
                <b>add(shortcut, handler, options)</b>- Add event to element
              </h4>
              <ul className="flex flex-col gap-3 mt-4 ml-5 text-lg">
                <li>
                  <strong>
                    shortcut * <span className="sr-only">required</span>{" "}
                  </strong>
                  <CodeType>
                    Array{"<"}String{">"} or String
                  </CodeType>
                  - Shortcut to trigger action. Example:
                  <CodeType>
                    "control+h" or ["control+h", "control+shift+h"]
                  </CodeType>
                </li>
                <li>
                  <strong>
                    handler * <span className="sr-only">required</span>
                  </strong>
                  <CodeType>Function</CodeType>- Action triggered when shortcut
                  is triggered. Example:{" "}
                  <CodeType>() {"=>"} console.log("hello");</CodeType>
                </li>
                <li>
                  <strong>options</strong>
                  <CodeType>Object</CodeType>- Extra settings
                  <ul className="flex flex-col gap-3 mt-4 ml-5 text-lg">
                    <li>
                      <strong>description</strong>
                      <CodeType>String</CodeType>- Event description
                    </li>
                    <li>
                      <strong>multiPlatform</strong>
                      <CodeType>Boolean</CodeType>- When true, 'control' and
                      'command' are enabled together.
                    </li>
                    <li>
                      <strong>
                        prevent * <span className="sr-only">required</span>
                      </strong>
                      <CodeType>Boolean</CodeType>- When true, activates
                      <CodeType>event.preventDefault()</CodeType>.
                    </li>
                    <li>
                      <strong>eventType</strong>
                      <CodeType>String</CodeType>- Sets event type.{" "}
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
            </div>
            <hr className="w-full h-[2px] border-none bg-gray-300" />
            <div>
              <h4 className="text-xl">
                <b>remove(shortcut)</b>- Remove existing event to element
              </h4>
              <ul className="flex flex-col gap-3 mt-4 ml-5 text-lg">
                <li>
                  <strong>shortcut</strong>
                  <CodeType>
                    Array{"<"}String{">"} or String
                  </CodeType>
                  - Shortcut to trigger action. Example:{" "}
                  <CodeType>
                    "control+h" or ["control+h", "control+shift+h"]
                  </CodeType>
                  . When there is no data, all element events will be removed.
                </li>
              </ul>
            </div>
            <hr className="w-full h-[2px] border-none bg-gray-300" />
            <div>
              <h4 className="text-xl">
                <b>list()</b>- List all events of element
              </h4>
              <p className="my-4">
                Returns object with all active events information. Example:
              </p>
              <pre className="max-w-full bg-gray-800 text-gray-300 rounded-md">
                {`
    {
      "control+h": {
        "options": {
          "description": "",
          "multiPlatform": true,
          "prevent": true,
          "eventType": "keydown"
        }
      }
    }
                `}
              </pre>
            </div>
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
                <img src="/github.svg" alt="Github" width={32} height={32} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
