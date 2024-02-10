import Image from "next/image";
import Particles from "./particles";
import Illustration from "@/public/images/glow-bottom.svg";
import { use, useEffect, useRef } from "react";

export default function Advance() {
  const moveDivRef = useRef(null);

  // function moveDiv(event: { clientX: any; clientY: any }, div: any) {
  //   var x = event.clientX;
  //   var y = event.clientY;

  //   // @ts-ignore
  //   moveDivRef.current!.style.left = x + "px";
  //   // @ts-ignore
  //   moveDivRef.current!.style.top = y + "px";
  // }
  // useEffect(() => {
  //   if (moveDivRef) {
  //     // @ts-ignore
  //     document.addEventListener("pointermove", moveDiv);
  //   }
  // }, [moveDivRef]);
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        >
          <filter id="pixelate-mosaic" x="0%" y="0%" width="100%" height="100%">
            <feGaussianBlur
              stdDeviation="2"
              in="SourceGraphic"
              result="smoothed"
            />
            <feImage
              width="15"
              height="15"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC"
              result="displacement-map"
            />
            <feTile in="displacement-map" result="pixelate-map" />
            <feDisplacementMap
              in="smoothed"
              in2="pixelate-map"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="50"
              result="pre-final"
            />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          {/* </defs> */}
          <filter id="pixelate" x="0" y="0">
            <feFlood x="4" y="4" height="2" width="2" />

            <feComposite width="10" height="10" />

            <feTile result="a" />

            <feComposite in="SourceGraphic" in2="a" operator="in" />

            <feMorphology operator="dilate" radius="5" />
          </filter>
        </svg>
        {/* <div ref={moveDivRef} id="movableDiv" className="filter-box"></div> */}
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        {/* <div
          className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={2146}
              priority
              alt="Illustration"
            />
          </div>
        </div> */}
        <div className="absolute inset-0 -z-[1] -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="/images/3.png"
            alt=""
          />
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-100/80 via-slate-100 to-slate-100/80 pb-4"
              data-aos="fade-down"
            >
              Machine still does not have a mind yet
            </h1>
            <p
              className="text-lg text-slate-100 mb-8"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Do what machine can't do to lead machine do what human can't do.
            </p>
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div>
                <a
                  className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                  href="#captcha"
                >
                  Get Started{" "}
                  <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </a>
              </div>
              <div>
                <a
                  className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out"
                  href="#0"
                >
                  <svg
                    className="shrink-0 fill-slate-300 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                  </svg>
                  <span>Read the docs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
