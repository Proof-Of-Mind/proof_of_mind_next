import { getCurrentStage, getHolders } from "@/utils/request";
import { useEffect, useMemo, useState } from "react";
import Particles from "./particles";

export default function TotalInfo() {
  const [currentStage, setCurrentStage] = useState(0);
  const [holders, setHolders] = useState(0);
  const currentRate = useMemo(() => {
    return (((1000000000 - currentStage) / 1000000000) * 100).toFixed(2);
  }, [currentStage]);
  const currentStageString = useMemo(() => {
    let str = currentStage.toLocaleString("en-US");
    let reg =
      str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
  }, [currentStage]);

  const hodersString = useMemo(() => {
    let str = holders.toLocaleString("en-US");
    let reg =
      str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
  }, [holders]);

  useEffect(() => {
    getCurrentStage(0).then((res) => {
      res.json().then((data) => {
        setCurrentStage(data.data);
      });
    });

    getHolders(0).then((res) => {
      res.json().then((data) => {
        setHolders(data.data);
      });
    });
  }, []);

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
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-[1] -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="/images/2.png"
            alt=""
          />
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            {/* <p
              className="text-lg text-slate-100 mb-8"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Do what machine can't do to lead machine do what human can't do.
            </p> */}
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:flex flex-col sm:justify-center space-y-4"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div className="btn justify-between text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group">
                <span>Current Stage</span>
                <span>
                  {currentStageString} / 1,000,000,000 ({currentRate}%)
                </span>
              </div>
              <div className="btn justify-between text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out">
                <span>Holders: </span>
                <span>{hodersString}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
