"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { CLAIM_CREATES, SET_REFERRAL } from "@/constants";
import { IGoldCreates } from "@/types";
import {
  checkToken,
  getUserTotal,
  mintCreates,
  setUserReferralCode,
} from "@/utils/request";
import { Transition } from "@headlessui/react";
import { crypto } from "@okxweb3/coin-bitcoin";
import localforage from "localforage";
import { useSearchParams } from "next/navigation";
import Swiper, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
import BaseModal from "../BaseModal";
import InfoModal from "../InfoModal";
import { notification } from "../Notiofication";
import ResultModal from "../ResultModal";
import { ConnectContext } from "../provider/ConnectProvider";
import { useLoading } from "../provider/LoadingProvider";
import { ModalContext } from "../provider/ModalProvider";
import TotalNumber from "../ui/TotalNumber";
import LoadingAny from "../ui/loadingAny";
import Particles from "./particles";
Swiper.use([Autoplay]);

export default function Captcha() {
  const [tab, setTab] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [mintCount, setMintCount] = useState<number>(0);
  const [render, setRender] = useState<boolean>(false);
  const [renderedGt, setRenderedGt] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [showReferral, setShowReferral] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const { address, p, isConnected } = useContext(ConnectContext);

  useEffect(() => {
    if (isConnected) {
      getUserTotal(address).then((response: { json: () => Promise<any> }) => {
        response.json().then((data: any) => {
          if (data.code === 200 && data.data && data.data !== "0") {
            if (data.data.current === 2) {
              setProgress(0);
            } else {
              setProgress(Number(data.data.current));
            }
            setTotal(Number(data.data.total));
            setMintCount(Number(data.data.mintCount));
          }
        });
      });

      const referralCode = searchParams.get("referralCode");
      if (referralCode) {
        console.log(referralCode);
        setReferralCode(referralCode);
        setShowReferral(true);
      }
    }
  }, [address, isConnected]);

  const handleSetReferral = async (referralCode: string) => {
    setShowReferral(false);
    const message = SET_REFERRAL.replace("$", address);
    // @ts-ignore
    const result = await (window as any).okxwallet.bitcoin
      .signMessage(message, { from: address, type: "ecdsa" })
      .catch((err: any) => {
        notification("User cancel");
        return;
      });
    if (result) {
      setUserReferralCode({
        p: p,
        projectId: 0,
        signature: result,
        address: address,
        referralCode: referralCode,
      })
        .then((response: { json: () => Promise<any> }) => {
          response.json().then((data: any) => {
            if (data.code === 200) {
              notification("Set Referral success");
            } else {
              notification("Set Referral fail");
            }
          });
        })
        .catch((err: any) => {
          console.log(err);
          notification("Set Referral fail");
        });
    }
  };

  // let reqId = "";

  const initGeetest4 = () => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    win.initGeetest4(
      {
        captchaId: process.env.NEXT_PUBLIC_SITE_KEY,
        language: "eng",
        product: "bind",
        mask: {
          bgColor: "rgba(14, 0, 0, 0.7)",
        },
      },
      function (captcha: any) {
        captcha
          .onReady(function () {
            document.getElementsByClassName("geetest_box_logo")[0].remove();
            document.getElementsByClassName("geetest_feedback")[0].remove();
          })
          .onSuccess(function () {
            const result = captcha.getValidate();
            checkToken({
              token: JSON.stringify(result),
              address: address,
              reqId: "0",
              projectId: 0,
            })
              .then((response: { json: () => Promise<any> }) => {
                response.json().then((data: any) => {
                  if (data.code === 200 && data.data) {
                    const info: string = data.data;
                    const process = Number(info.split("$")[1]);
                    if (process === 2) {
                      setProgress(2);
                      setTimeout(() => {
                        setMintCount(Number(info.split("$")[2]));
                      }, 1000);
                    } else {
                      setProgress(process);
                    }
                    setTotal(Number(info.split("$")[0]));
                    notification("Check Captcha success", "top-center", 1);
                  } else {
                    notification("Check Captcha fail");
                  }
                });
              })
              .catch((err: any) => {
                notification("Check Captcha fail");
              });
          })
          .onFail(function () {});
        document
          .getElementById("gtButton")!
          .addEventListener("click", function () {
            captcha.showCaptcha();
            // getReqId(address, 0)
            //   .then((response: { json: () => Promise<any> }) => {
            //     response.json().then((data: any) => {
            //       if (data.code === 200) {
            //         reqId = data.data;
            //         captcha.showCaptcha();
            //       } else {
            //         notification("Check Captcha fail");
            //       }
            //     });
            //   })
            //   .catch((err: any) => {
            //     notification("Check Captcha fail");
            //   });
          });
      }
    );
  };

  useEffect(() => {
    if (isConnected && !renderedGt) {
      initGeetest4();
      setRenderedGt(true);
    }
  }, [isConnected, renderedGt]);

  return (
    <section id="captcha">
      <BaseModal
        showModal={showReferral}
        callback={handleSetReferral}
        onClose={() => setShowReferral(false)}
        title={"Check Your Referral Info"}
        content={referralCode}
        button={"Confirm"}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
          <div className="h-[200%] animate-endless">
            <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
            <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
            <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
            <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
          </div>
        </div>
        {/* Illustration */}
        {/* <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features Illustration"
            />
          </div>
        </div> */}

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">
              {/* Content */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div className="w-full">
                  <Progress render={render} progress={progress}></Progress>
                </div>
                <div
                  className={
                    progress === 2
                      ? `mt-8  max-md:mx-auto space-y-2`
                      : `mt-8  max-md:mx-auto space-y-2`
                  }
                >
                  <div
                    // id="h-captcha"
                    className={render ? "visible" : "invisible"}
                  >
                    <button id="gtButton" className="button w-full">
                      <span className="button-outline">
                        <span className="button-inside">
                          <span className="button-text visually-hidden">
                            Check Captcha
                          </span>
                          <span
                            className="button-text-characters-container"
                            aria-hidden="true"
                          ></span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div id="h-captcha"></div>
                </div>
                <div className="mt-8 max-md:mx-auto flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center w-full">
                  <Mint
                    render={render}
                    mintCount={mintCount}
                    setTotal={setTotal}
                    setMintCount={setMintCount}
                  ></Mint>
                </div>
                <div className="mt-8 max-md:mx-auto space-y-2 flex justify-start items-center w-full">
                  <TotalNumber render={render} total={total}></TotalNumber>
                </div>
                <Interactive
                  render={render}
                  setRender={setRender}
                  setProgress={setProgress}
                  setMintCount={setMintCount}
                  setTotal={setTotal}
                ></Interactive>
              </div>

              {/* Image */}
              <div
                className="md:w-5/12 lg:w-1/2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="relative py-24 -mt-12">
                  {/* Particles animation */}
                  <Particles
                    className="absolute inset-0 -z-10"
                    quantity={8}
                    staticity={30}
                  />

                  <div className="flex items-center justify-center relative">
                    <div className="relative w-48 h-48 flex justify-center items-center">
                      {/* Halo effect */}
                      {/* <svg
                        className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none blur-md"
                        width="480"
                        height="480"
                        viewBox="0 0 480 480"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="pulse-a"
                            x1="50%"
                            x2="50%"
                            y1="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#A855F7" />
                            <stop offset="76.382%" stopColor="#FAF5FF" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </linearGradient>
                        </defs>
                        <g fillRule="evenodd">
                          <path
                            className="pulse"
                            fill="url(#pulse-a)"
                            fillRule="evenodd"
                            d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"
                          />
                          <path
                            className="pulse pulse-1"
                            fill="url(#pulse-a)"
                            fillRule="evenodd"
                            d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"
                          />
                          <path
                            className="pulse pulse-2"
                            fill="url(#pulse-a)"
                            fillRule="evenodd"
                            d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"
                          />
                        </g>
                      </svg> */}
                      {/* Grid */}
                      {/* <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
                        <div className="h-[200%] animate-endless">
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                        </div>
                      </div> */}
                      {/* Icons */}
                      <Transition
                        show={tab === 1}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0 -rotate-[60deg]"
                        enterTo="opacity-100 rotate-0"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100 rotate-0"
                        leaveTo="opacity-0 rotate-[60deg]"
                      >
                        {/* <div className="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <svg
                            className="relative fill-slate-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="25"
                          >
                            <path
                              fillRule="nonzero"
                              d="M10.55 15.91H.442L14.153.826 12.856 9.91h10.107L9.253 24.991l1.297-9.082Zm.702-8.919L4.963 13.91h7.893l-.703 4.918 6.289-6.918H10.55l.702-4.918Z"
                            />
                          </svg>
                        </div> */}
                        <div className="card w-[100px] h-[200px] lg:w-[200px] lg:h-[300px] !border-none flex-none clip-card absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 hover:z-10">
                          <div className="card-item flex flex-col items-start justify-start pt-4 relative item-2"></div>
                        </div>
                        <div className="card w-[100px] h-[200px] lg:w-[200px] lg:h-[300px] !border-none flex-none  clip-card absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  -ml-[120px] hover:z-10">
                          <div className="card-item flex flex-col items-start justify-start pt-4 relative item-1 !border-none"></div>
                        </div>
                        <div className="card w-[100px] h-[200px] lg:w-[200px] lg:h-[300px] !border-none flex-none clip-card absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4  ml-[120px] hover:z-10">
                          <div className="card-item flex flex-col items-start justify-start pt-4 relative item-0 !shadow-none !border-none"></div>
                        </div>
                      </Transition>
                      <Transition
                        show={tab === 2}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0 -rotate-[60deg]"
                        enterTo="opacity-100 rotate-0"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100 rotate-0"
                        leaveTo="opacity-0 rotate-[60deg]"
                      >
                        <div className="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <svg
                            className="relative fill-slate-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                          >
                            <path d="M18 14h-2V8h2c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4v2H8V4c0-2.2-1.8-4-4-4S0 1.8 0 4s1.8 4 4 4h2v6H4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-2h6v2c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4ZM16 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2h-2V4ZM2 4c0-1.1.9-2 2-2s2 .9 2 2v2H4c-1.1 0-2-.9-2-2Zm4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2h2v2ZM8 8h6v6H8V8Zm10 12c-1.1 0-2-.9-2-2v-2h2c1.1 0 2 .9 2 2s-.9 2-2 2Z" />
                          </svg>
                        </div>
                      </Transition>
                      <Transition
                        show={tab === 3}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0 -rotate-[60deg]"
                        enterTo="opacity-100 rotate-0"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100 rotate-0"
                        leaveTo="opacity-0 rotate-[60deg]"
                      >
                        <div className="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <svg
                            className="relative fill-slate-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="14"
                          >
                            <path
                              fillRule="nonzero"
                              d="m10 5.414-8 8L.586 12 10 2.586l6 6 8-8L25.414 2 16 11.414z"
                            />
                          </svg>
                        </div>
                      </Transition>
                      <>
                        <svg style={{ position: "absolute" }}>
                          <filter
                            id="pixelate-mosaic"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                          >
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
                            <feTile
                              in="displacement-map"
                              result="pixelate-map"
                            />
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

                            <feComposite
                              in="SourceGraphic"
                              in2="a"
                              operator="in"
                            />
                            <feMorphology operator="dilate" radius="5" />
                          </filter>
                        </svg>
                        {/* <div id="movableDiv" className="filter"></div> */}
                      </>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Interactive({
  render,
  setRender,
  setProgress,
  setMintCount,
  setTotal,
}: {
  render: boolean;
  setRender: Function;
  setProgress: Function;
  setMintCount: Function;
  setTotal: Function;
}) {
  const { address, isConnected, connect } = useContext(ConnectContext);
  const [rendered, setRendered] = useState<boolean>(false);

  const handleGetRecaptcha = () => {
    // const win: any = typeof window !== "undefined" ? window : undefined;
    // if (!win || !win.grecaptcha) return;
    // if (!address || !isConnected) {
    //   return;
    // }
    // const hSiteKey = "062c5788-64fb-45a8-b05c-1d4371cb32fd";
    // return new Promise((res) => {
    //   win.hcaptcha.render("h-captcha", {
    //     sitekey: hSiteKey,
    //     theme: "dark",
    //     "open-callback": onOpened,
    //     // "close-callback": onClosed,
    //     callback: (token: any) => {
    //       checkToken(token, address)
    //         .then((response: { json: () => Promise<any> }) => {
    //           response.json().then((data: any) => {
    //             if (data.code === 200) {
    //               const info: string = data.data;
    //               const process = Number(info.split("$")[1]);
    //               if (process === 2) {
    //                 setProgress(2);
    //                 setMintCount(Number(info.split("$")[2]));
    //               } else {
    //                 setProgress(process);
    //               }
    //               setTotal(Number(info.split("$")[0]));
    //               res("success");
    //             } else {
    //               res("fail");
    //             }
    //           });
    //         })
    //         .catch((err: any) => {
    //           console.log(err);
    //           res("fail");
    //         })
    //         .finally(() => {
    //           win.grecaptcha.reset();
    //         });
    //     },
    //   });
    // });
  };

  const handleSubmitRecaptcha = async () => {
    if (!isConnected) {
      await connect();
      return;
    }
    if (!render) {
      await handleGetRecaptcha();
      setRender(true);
      setRendered(true);
    }
  };

  useEffect(() => {
    if (address && isConnected) {
      setRender(true);
      if (rendered) {
        return;
      }
      handleGetRecaptcha();
      setRendered(true);
    } else {
      setRender(false);
    }
  }, [address, isConnected]);
  return !render ? (
    <div
      className="skill-outer interactive cursor-pointer w-full h-full flex justify-center items-start"
      onClick={handleSubmitRecaptcha}
    >
      <button className="button pl-1 text-lg">
        <span className="button-outline">
          <span className="button-inside">
            <span className="button-text visually-hidden">Start POM</span>
            <span
              className="button-text-characters-container"
              aria-hidden="true"
            ></span>
          </span>
        </span>
      </button>
    </div>
  ) : null;
}

let typeOrigin = 0;

function Mint({
  render,
  mintCount,
  setTotal,
  setMintCount,
}: {
  render: boolean;
  mintCount: number;
  setTotal: Function;
  setMintCount: Function;
}) {
  const { address, p } = useContext(ConnectContext);

  const { isLoading, showLoading, hideLoading } = useLoading();

  const { open, close, showModal, title, content, button } =
    useContext(ModalContext);

  const [showResult, setShowResult] = useState<boolean>(false);
  const [mintTitle, setMintTitle] = useState<string>("Mint Creates");
  const [resultTitle, setResultTitle] = useState<string>("Mint Result");
  const [resultInfo, setResultInfo] = useState<string>("");

  const callback = (result: string) => {
    handleSignature(typeOrigin, result);
    close();
  };

  const handleInputMessage = (type: number) => {
    if (mintCount <= 0) {
      return;
    }
    if (type === 1 && mintCount < 10) {
      return;
    }
    typeOrigin = type;
    if (type === 0) {
      setMintTitle("Mint Creates");
    } else {
      setMintTitle("Mint Creates x10");
    }
    open(mintTitle, "Please input your nonce", "Confirm");
  };

  const handleSignature = async (type: number, message: string) => {
    if (mintCount <= 0 || !message || message === "") {
      return;
    }
    showLoading();
    // win.grecaptcha.ready(function () {
    //   win.grecaptcha
    //     .execute("6LcdEEQpAAAAAEZ8-HhtKB7ooZuMRzlkQoBNW1-B", {
    //       action: "submit",
    //     })
    //     .then(function (token) {
    //       // Add your logic to submit to your backend server here.
    //     });
    // });

    const hashMessage = crypto.sha256(Buffer.from(message)).toString("hex");
    message = CLAIM_CREATES.replace("$", hashMessage);
    // @ts-ignore
    const result = await (window as any).okxwallet.bitcoin
      .signMessage(message, { from: address, type: "ecdsa" })
      .catch((err: any) => {
        notification("User cancel");
        hideLoading();
        return;
      });

    if (result) {
      mintCreates({
        address: address,
        signature: result,
        projectId: 0,
        typedMessage: {
          p: p,
          message: message,
          type: type,
        },
      })
        .then((response: { json: () => Promise<any> }) => {
          response.json().then((data: any) => {
            if (data.code === 200) {
              if (type === 0) {
                setResultTitle("Mint result");
              } else {
                setResultTitle("Mint x10 result");
              }
              setShowResult(true);
              setResultInfo(data.data);
              getUserTotal(address).then(
                (response: { json: () => Promise<any> }) => {
                  response.json().then((data: any) => {
                    if (data.code === 200 && data.data !== "0") {
                      setMintCount(Number(data.data.mintCount));
                      setTotal(Number(data.data.total));
                    }
                  });
                }
              );

              if (
                data.data.createsInfoList &&
                data.data.createsInfoList.length > 0
              ) {
                data.data.createsInfoList.forEach((item: any) => {
                  if (item.createsType === "0") {
                    let gold: IGoldCreates = {
                      mintId: item.mintId,
                      nonce: message,
                      hex: item.randomHex,
                    };
                    localforage
                      .getItem(address)
                      .then((value: any) => {
                        if (value && value.length > 0) {
                          value.push(gold);
                          localforage.setItem(address, value);
                        } else {
                          localforage.setItem(address, [gold]);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              }
            } else {
              notification(data.msg);
            }
          });
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          hideLoading();
        });
    }
  };

  return render ? (
    <>
      {isLoading ? <LoadingAny></LoadingAny> : null}
      <InfoModal
        showModal={showModal}
        callback={callback}
        onClose={close}
        title={mintTitle}
        content={content}
        button={button}
      />
      <ResultModal
        showModal={showResult}
        callback={() => setShowResult(false)}
        title={resultTitle}
        content={resultInfo}
        button={button}
      />
      <div
        className={
          mintCount > 0
            ? `inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md`
            : `inline-flex relative`
        }
      >
        <div
          className={
            mintCount > 0
              ? `btn-sm py-0.5 w-[200px] text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-[3px] before:pointer-events-none shadow cursor-pointer`
              : `btn-sm py-0.5 w-[200px] text-slate-300 hover:text-white transition duration-150 ease-in-out group relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-[3px] before:pointer-events-none shadow cursor-not-allowed`
          }
        >
          <span
            className="relative inline-flex items-center text-2xl sm:px-6 max-w-[220px]"
            onClick={() => handleInputMessage(0)}
          >
            Mint&nbsp;
            <span className="text-xl truncate">(&nbsp;{mintCount}&nbsp;)</span>
            {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"></span> */}
          </span>
        </div>
      </div>
      <div
        className={
          mintCount > 9
            ? `inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md`
            : `inline-flex relative`
        }
      >
        <div
          className={
            mintCount > 9
              ? `btn-sm py-0.5 w-[200px] text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-[3px] before:pointer-events-none shadow cursor-pointer`
              : `btn-sm py-0.5 w-[200px] text-slate-300 hover:text-white transition duration-150 ease-in-out group relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-[3px] before:pointer-events-none shadow cursor-not-allowed`
          }
        >
          <span
            className="relative inline-flex items-center text-2xl sm:px-6"
            onClick={() => handleInputMessage(1)}
          >
            Mint<span className="text-xl">&nbsp;x</span>10
            {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"></span> */}
          </span>
        </div>
      </div>
    </>
  ) : null;
}

function Progress({ render, progress }: { render: boolean; progress: number }) {
  const bar = useRef<HTMLDivElement>(null);
  const [progressText, setProgressText] = useState<string>("0");
  const [batStyle, setBarStyle] = useState<any>({
    width: "0%",
    visibility: "hidden",
  });

  useEffect(() => {
    if (progress === 1) {
      setBarStyle({
        width: "50%",
        visibility: "visible",
        backgroundColor: "#fcd200",
        backgroundImage:
          "linear-gradient(to right, transparent, rgba(252, 210, 0, 0.9)), radial-gradient(#fff60d 1px, transparent 0), radial-gradient(#fff60d 1px, transparent 0)",
      });
      setProgressText("1");
    }
    if (progress === 2) {
      setBarStyle({
        width: "100%",
        visibility: "visible",
        backgroundColor: "#86C166",
        backgroundImage:
          "linear-gradient(to right, transparent, rgba(34, 125, 81, 0.9)), radial-gradient(#5DAC81 1px, transparent 0), radial-gradient(#5DAC81 1px, transparent 0)",
      });
      setProgressText("2");
      setTimeout(() => {
        setBarStyle({
          width: "0%",
          visibility: "hidden",
        });
        setProgressText("0");
      }, 1000);
    }
    if (progress === 0) {
      setBarStyle({
        width: "0%",
        visibility: "hidden",
      });
      setProgressText("0");
    }
  }, [progress]);

  return render ? (
    <div className="container feedback space-x-8 relative" ref={bar}>
      <span className="h-full flex text-xl">Progress</span>
      <button className="button relative flex-1">
        <span className="button-text !absolute w-full h-full inset-0 top-1/4 left-1/4 -translate-x-1/4 -translate-y-1/4 text-xl text-purple-400 z-10">
          {progressText} / 2
        </span>
        <span className="button-outline">
          <span className="progress-inside" style={batStyle}>
            <span
              className="button-text-characters-container"
              aria-hidden="true"
            ></span>
          </span>
        </span>
      </button>
    </div>
  ) : null;
}
