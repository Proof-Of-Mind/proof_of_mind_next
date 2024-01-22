"use client";

import { useContext, useEffect, useRef, useState } from "react";

import Illustration from "@/public/images/glow-top.svg";
import { checkToken, getUserTotal, mintCreates } from "@/utils/request";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import InfoModal from "./InfoModal";
import ResultModal from "./ResultModal";
import Particles from "./particles";
import { ConnectContext } from "./provider/ConnectProvider";
import { ModalContext } from "./provider/ModalProvider";
import { crypto } from "@okxweb3/coin-bitcoin";
import { notification } from "./Notiofication";

export default function Captcha() {
  const [tab, setTab] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [mintCount, setMintCount] = useState<number>(0);
  const [render, setRender] = useState<boolean>(false);
  const { address, isConnected } = useContext(ConnectContext);

  useEffect(() => {
    if (isConnected) {
      getUserTotal(address).then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200 && data.data !== "0") {
            setProgress(Number(data.data.current));
            setTotal(Number(data.data.total));
            setMintCount(Number(data.data.mintCount));
          }
        });
      });
    }
  }, [address, isConnected]);

  return (
    <section id="captcha">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Illustration */}
        <div
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
        </div>

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
                <div>
                  <Progress render={render} progress={progress}></Progress>
                </div>
                <div
                  className={
                    progress === 2
                      ? `mt-8 max-w-xs max-md:mx-auto space-y-2`
                      : `mt-8 max-w-xs max-md:mx-auto space-y-2`
                  }
                >
                  <div
                    className={render ? "visible" : "invisible"}
                    id="recaptchaClient"
                  ></div>
                </div>
                <div className="mt-8 max-md:mx-auto flex justify-between items-center w-full">
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

                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48 flex justify-center items-center">
                      {/* Halo effect */}
                      <svg
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
                      </svg>
                      {/* Grid */}
                      <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
                        <div className="h-[200%] animate-endless">
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                        </div>
                      </div>
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
                        <div className="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
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
  // const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { address, isConnected, connect } = useContext(ConnectContext);

  const handleGetRecaptcha = () => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    if (!win || !win.grecaptcha) return;
    if (!address || !isConnected) {
      return;
    }

    const hSiteKey = "062c5788-64fb-45a8-b05c-1d4371cb32fd";

    return new Promise((res) => {
      // win.grecaptcha.render("recaptchaClient", {
      //   sitekey: "6LfcwEkpAAAAAKukrCZvzObxCNLxA6NKgJmIoMfm",
      //   theme: "dark",
      win.hcaptcha.render("recaptchaClient", {
        sitekey: hSiteKey,
        theme: "dark",
        "error-callback": () => {
          console.log("error-callback");
        },
        callback: (token: any) => {
          checkToken(token, address)
            .then((response) => {
              response.json().then((data: any) => {
                if (data.code === 200) {
                  const info: string = data.data;
                  const process = Number(info.split("$")[1]);
                  if (process === 2) {
                    setProgress(2);
                    setTimeout(() => {
                      setProgress(0);
                      console.log("done process");
                      setMintCount(Number(info.split("$")[2]));
                    }, 1000);
                  } else {
                    setProgress(process);
                  }
                  setTotal(Number(info.split("$")[0]));
                  res("success");
                } else {
                  res("fail");
                }
              });
            })
            .catch((err) => {
              console.log(err);
              res("fail");
            })
            .finally(() => {
              console.log("done");
              win.grecaptcha.reset();
            });
          // res(token);
        },
      });
    });
  };

  const handleSubmitRecaptcha = async () => {
    if (!isConnected) {
      await connect();
      return;
    }
    if (!render) {
      setRender(true);
      await handleGetRecaptcha();
    }
  };

  useEffect(() => {
    if (address && isConnected) {
      setRender(true);
      handleGetRecaptcha();
    } else {
      setRender(false);
    }
  }, [address, isConnected]);
  return !render ? (
    <div
      className="skill-outer interactive cursor-pointer w-full h-full flex justify-center"
      onClick={handleSubmitRecaptcha}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 160"
        width={220}
        height={220}
      >
        <g opacity=".87" fill="none" stroke="#fff">
          <text
            className="text mx-auto"
            transform="translate(50 146.24)"
            fill="#fff"
            stroke="none"
            fontSize="16"
            fontFamily="RobotoMono-Medium,Roboto Mono"
            fontWeight="500"
          >
            Start POM
          </text>
          <path className="ellipse4" />
          <path className="ellipse3" />
          <path className="ellipse2" />
          <path className="ellipse1" />
          <path className="ellipse0" />
          <path
            className="ellipse"
            d="M68,61.83a12,12 0 1,0 24,0a12,12 0 1,0 -24,0"
            strokeMiterlimit="10"
            fill="#fff"
            opacity="0.87"
          />
          <path
            className="hand"
            d="M100.33 82.21a5.82 5.82 0 0 0-3.66.19c-.08-.93-.46-3.07-2.32-3.64a5.83 5.83 0 0 0-3.74.21 3.59 3.59 0 0 0-2.24-3 5.85 5.85 0 0 0-3.64.17v-7.68c0-2-.83-5.44-4-5.44-2.91 0-4 3.25-4 5.44v17.08C75.34 84.12 73 82.13 71.14 82c-3-.24-5.19 1.64-4.59 4.56s3.12 2.75 5 5.14 6.34 9.81 6.37 9.86c.67 1.26 2.49 4.74 2.79 5.62a12 12 0 0 1 .27 3.09.79.79 0 0 0 .22.55.76.76 0 0 0 .54.23h17.18a.77.77 0 0 0 .76-.68 17.08 17.08 0 0 0 0-2.73 5.5 5.5 0 0 1 1.32-3.84 11.61 11.61 0 0 0 1.63-4.52.41.41 0 0 0 0-.11V86.28c.04-.28-.01-3.35-2.3-4.07z"
            fill="#121212"
            stroke="#fff"
            strokeMiterlimit="10"
          />
          <path className="bar" d="M96.68 88.8v-6.4" />
          <path className="bar" d="M90.61 87.29v-8.36" />
          <path className="bar" d="M84.73 86.74V76.13" />
          <path className="bar" d="M76.79 87.94v-2.39" />
        </g>
      </svg>
    </div>
  ) : null;
}

function TotalNumber({ render, total }: { render: boolean; total: number }) {
  const number = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const rights = useRef<HTMLDivElement>(null);
  const separator = useRef<HTMLDivElement>(null);
  let target = total;
  let current = 0;
  const step = 42;

  const reset = () => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    if (!win) return;
    win.requestAnimationFrame(start);
  };

  const start = () => {
    rights.current?.classList.add("animate");
    update();
  };

  const updateValues = () => {
    const [first, ...rest] = current
      .toLocaleString("en-US")
      .split(",")
      .reverse();
    let thousends = rest.reverse();

    const thousendsString = thousends.join("");
    if (left.current && +left.current?.innerText !== +thousendsString) {
      left.current && left.current.classList.add("animate");
    } else {
      left.current && left.current?.classList.remove("animate");
    }

    if (left.current) {
      left.current.innerText = thousendsString;
    }
    if (rights.current) {
      rights.current.innerText = first;
    }
  };

  const update = () => {
    if (target - current > 0) {
      current += step;
    } else {
      current -= step;
    }
    if (current >= 1000) {
      separator.current && separator.current.classList.add("show");
    } else {
      separator.current && separator.current.classList.remove("show");
    }
    updateValues();
    if (Math.abs(target - current) > step) {
      requestAnimationFrame(update);
    } else {
      requestAnimationFrame(() => {
        current = target;
        updateValues();
        if (left.current) {
          left.current.classList.remove("animate");
        }
        if (rights.current) {
          rights.current.classList.remove("animate");
        }
      });
    }
  };

  reset();

  return render ? (
    <>
      <div
        className="number text-[36px] sm:text-[48px] w-full"
        id="number"
        ref={number}
      >
        <div className="left" id="left" ref={left}></div>
        <div className="separator" id="separator" ref={separator}>
          ,
        </div>
        <div className="right" id="right" ref={rights}>
          {total}
        </div>
      </div>

      <svg
        className="svgFilter"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="blurFilter">
            <feGaussianBlur
              id="blurFilterItem"
              in="SourceGraphic"
              stdDeviation="8,0"
            />
          </filter>
        </defs>
      </svg>
    </>
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

  const { open, close, showModal, title, content, button } =
    useContext(ModalContext);

  const [showResult, setShowResult] = useState<boolean>(false);
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
    open("Mint Creates", "Please input your message", "Confirm");
  };

  const handleSignature = async (type: number, message: string) => {
    if (mintCount <= 0) {
      return;
    }

    const hashMessage = crypto.sha256(Buffer.from(message)).toString("hex");
    // @ts-ignore
    const result = await (window as any).okxwallet.bitcoin.signMessage(
      hashMessage,
      { from: address, type: "ecdsa" }
    );

    mintCreates({
      address: address,
      signature: result,
      projectId: 0,
      typedMessage: {
        p: p,
        message: hashMessage,
        type: type,
      },
    })
      .then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200) {
            setShowResult(true);
            setResultInfo(data.data);
            getUserTotal(address).then((response) => {
              response.json().then((data: any) => {
                if (data.code === 200 && data.data !== "0") {
                  setMintCount(Number(data.data.mintCount));
                  setTotal(Number(data.data.total));
                }
              });
            });
          } else {
            notification(data.msg);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return render ? (
    <>
      <InfoModal
        showModal={showModal}
        callback={callback}
        title={title}
        content={content}
        button={button}
      />
      <ResultModal
        showModal={showResult}
        callback={() => setShowResult(false)}
        title={"Mint Result"}
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
              ? `btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow cursor-pointer`
              : `btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow cursor-not-allowed`
          }
        >
          <span
            className="relative inline-flex items-center text-2xl sm:px-6 max-w-[220px]"
            onClick={() => handleInputMessage(0)}
          >
            Mint&nbsp;<span className="text-xl truncate">({mintCount})</span>
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
              ? `btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow cursor-pointer`
              : `btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow cursor-not-allowed`
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

  useEffect(() => {
    if (progress === 1) {
      bar.current?.classList.add("one");
    }
    if (progress === 2) {
      bar.current?.classList.remove("one");
      bar.current?.classList.add("two");
    }
    // if (progress === 3) {
    //   bar.current?.classList.remove('two');
    //   bar.current?.classList.add('three');
    // }
    // if (progress === 4) {
    //   bar.current?.classList.remove('three');
    //   bar.current?.classList.add('four');
    // }
    // if (progress === 5) {
    //   bar.current?.classList.remove('four');
    //   bar.current?.classList.add('five');
    // }
    if (progress === 0) {
      bar.current?.classList.remove("two");
    }
  }, [progress]);

  return render ? (
    <div className="container">
      <span className="w-full h-full flex text-xl">Progress</span>
      <div className="progress">
        <div ref={bar} className="progress-bar relative">
          <span className="absolute top-1/5 left-0 text-xl w-full h-full bg-clip-text bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 text-purple-500 fix">
            {progress} / 2
          </span>
        </div>
      </div>
    </div>
  ) : null;
}
