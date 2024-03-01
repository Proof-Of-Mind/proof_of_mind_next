"use client";
import { notification } from "@/components/Notiofication";
import { ConnectContext } from "@/components/provider/ConnectProvider";
import { useLoading } from "@/components/provider/LoadingProvider";
import Particles from "@/components/section/particles";
import LoadingAny from "@/components/ui/loadingAny";
import {
  checkAlreadyClaimSilver,
  claimSilverShare,
  getSilverCount,
} from "@/utils/request";
import { Transition } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Silver = () => {
  const [render, setRender] = useState<boolean>(false);
  const [checkClaimed, setCheckClaimed] = useState<boolean>(false);
  const [silverCount, setSilverCount] = useState<number>(0);
  const searchParams = useSearchParams();
  const { address, check, connect } = useContext(ConnectContext);
  const { isLoading, showLoading, hideLoading } = useLoading();

  const getCount = () => {
    if (address) {
      const link = searchParams.get("link");
      getSilverCount(0, link as string).then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200) {
            setSilverCount(data.data);
          }
        });
      });
    }
  };

  const checkAlreadyClaimSilverCreates = () => {
    if (address) {
      const link = searchParams.get("link");
      checkAlreadyClaimSilver(0, address, link as string)
        .then((response) => {
          response.json().then((data: any) => {
            if (data.code === 200) {
              setRender(true);
              if (data.data === "0") {
                setCheckClaimed(true);
              }
            }
          });
        })
        .catch((error) => {
          notification("Check claim error");
        });
    }
  };

  const claimSilverCreates = () => {
    showLoading();
    const link = searchParams.get("link");
    claimSilverShare({
      address: address,
      projectId: 0,
      link: link as string,
    })
      .then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200) {
            notification("Claim success", "top-center", 1);
            setCheckClaimed(false);
          } else {
            notification(data.msg);
          }
        });
      })
      .finally(() => {
        hideLoading();
      });
  };

  useEffect(() => {
    if (address) {
      getCount();
      checkAlreadyClaimSilverCreates();
    } else {
      const flag = check();
      if (!flag) {
        console.error("connect wallet error");
        notification(
          "Please install wallet or select supported browser",
          "top-center",
          3
        );
      } else {
        connect();
      }
    }
  }, [address]);

  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {isLoading ? <LoadingAny></LoadingAny> : null}
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Claim your silver creates
        </h1>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="md:w-5/12 lg:w-1/2 mx-auto"
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
                  show={true}
                  className="absolute"
                  enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                  enterFrom="opacity-0 -rotate-[60deg]"
                  enterTo="opacity-100 rotate-0"
                  leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                  leaveFrom="opacity-100 rotate-0"
                  leaveTo="opacity-0 rotate-[60deg]"
                >
                  <div className="card w-[300px] h-[400px] sm:w-[200px] sm:h-[300px] flex-none -rotate-12 opacity-75">
                    <div className="card-item flex flex-col items-start justify-start pt-4 relative item-1"></div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">
          {render && !checkClaimed ? (
            <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">
              <span className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-2 bg-purple-600 hover:bg-purple-700 text-lg font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-xl">
                😵 You have claimed this share.
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-2 bg-purple-600 hover:bg-purple-700 text-lg font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-xl"
              onClick={claimSilverCreates}
            >
              Claim remaining {silverCount}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Silver;
