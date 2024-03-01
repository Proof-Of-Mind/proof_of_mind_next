import { useEffect } from "react";
import Highlighter, { HighlighterItem } from "../highlighter";
import Particles from "./particles";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export default function FeaturesFast() {
  const randomChar = () =>
      chars[Math.floor(Math.random() * (chars.length - 1))],
    randomString = (length: number) =>
      Array.from(Array(length)).map(randomChar).join("");

  const randomText = () => {
    const card = document.getElementById("lettersCard")!;
    const letters = document.getElementsByClassName("letters")[0]!;
    const animation = () => {
      const rect = card.getBoundingClientRect(),
        x = Math.random() * rect.width,
        y = Math.random() * rect.height;

      // @ts-ignore
      letters.style.setProperty("--x", `${x}px`);
      // @ts-ignore
      letters.style.setProperty("--y", `${y}px`);
      // @ts-ignore
      letters.innerText = randomString(1500);
    };
    requestAnimationFrame(animation);
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    setTimeout(() => {
      interval = setInterval(() => {
        randomText();
      }, 100);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative">
      {/* Particles animation */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24 -ml-32">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={6}
          staticity={30}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6" id="creates">
        <div className="pt-16 md:pt-32">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Creates
            </h2>
            <p className="text-lg text-slate-400">
              There are many variations available, but the majority have
              suffered alteration in some form, by injected humour, or
              randomised words which don't look even slightly believable.
            </p>
          </div>

          {/* Highlighted boxes */}
          <div className="relative pb-4">
            {/* Blurred shape */}
            <div
              className="absolute bottom-0 -mb-20 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                <defs>
                  <linearGradient
                    id="bs2-a"
                    x1="19.609%"
                    x2="50%"
                    y1="14.544%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#bs2-a)"
                  fillRule="evenodd"
                  d="m346 898 461 369-284 58z"
                  transform="translate(-346 -898)"
                />
              </svg>
            </div>
            {/* Grid */}
            <Highlighter className="grid md:grid-cols-12 gap-6 group">
              {/* Box #1 */}
              <div className="md:col-span-12" data-aos="fade-down">
                <HighlighterItem>
                  <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      {/* Blurred shape */}
                      <div
                        className="absolute right-0 top-0 blur-2xl"
                        aria-hidden="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="342"
                          height="393"
                        >
                          <defs>
                            <linearGradient
                              id="bs-a"
                              x1="19.609%"
                              x2="50%"
                              y1="14.544%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#6366F1" />
                              <stop
                                offset="100%"
                                stopColor="#6366F1"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#bs-a)"
                            fillRule="evenodd"
                            d="m104 .827 461 369-284 58z"
                            transform="translate(0 -112.827)"
                            opacity=".7"
                          />
                        </svg>
                      </div>
                      {/* Radial gradient */}
                      <div
                        className="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-70" />
                        <div className="absolute w-1/4 h-1/4 translate-z-0 bg-purple-400 rounded-full blur-[40px]" />
                      </div>
                      {/* Image */}
                      <div className="relative w-full h-64 md:h-auto overflow-hidden">
                        <div
                          id="lettersCard"
                          className="absolute h-[126px] bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:relative md:left-0{md}transla{}-x-0"
                        >
                          {/* <div className="letters-gradient"></div> */}
                          <div className="letters fpurple py-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
            </Highlighter>
          </div>
        </div>
      </div>
    </section>
  );
}
