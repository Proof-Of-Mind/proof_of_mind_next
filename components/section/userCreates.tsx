"use client";

import { Transition } from "@headlessui/react";
import {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Particles from "./particles";

import { useVirtualizer } from "@tanstack/react-virtual";

interface Item {
  img: string;
  quote: string;
  name: string;
  role: string;
}

export default function UserCreates() {
  const [active, setActive] = useState<number>(0);
  const { address, p } = useContext(ConnectContext);
  const childRef = useRef<HTMLDivElement>(null);

  const [showBurnModal, setShowBurnModal] = useState<boolean>(false);
  const [showCreates, setShowCreates] = useState<boolean>(false);

  const items: Item[] = [
    {
      img: "/images/gavtar.png",
      quote:
        "Cons succeed for inducing judgment errors—chiefly, errors arising from imperfect information and cognitive biases.",
      name: "Gold Creates",
      role: "Ltd Head of Product",
    },
    {
      img: "/images/savtar.png",
      quote:
        "The relationship begins on the internet, but extends into real life interaction.",
      name: "Silver Creates",
      role: "Spark Founder & CEO",
    },
    {
      img: "/images/bavtar.png",
      quote:
        "The most difficult human skills to reverse engineer are those that are below the level of conscious awareness. we're more aware of simple processes that don't work well than of complex ones that work flawlessly.",
      name: "Bronze Creates",
      role: "Appy Product Lead",
    },
  ];

  const testimonials = useRef<HTMLDivElement>(null);

  const handleBurnGold = async (
    id1: number,
    nonce1: string,
    id2: number,
    nonce2: string
  ) => {
    const message = BURN_CREATES.replace("$", id1.toString()).replace(
      "#",
      id2.toString()
    );
    // @ts-ignore
    const result = await (window as any).okxwallet.bitcoin.signMessage(
      message,
      {
        from: address,
        type: "ecdsa",
      }
    );
    const hashMessage1 = crypto.sha256(Buffer.from(nonce1)).toString("hex");
    const hashMessage2 = crypto.sha256(Buffer.from(nonce2)).toString("hex");

    let goldNonceList = [
      {
        goldId: id1,
        message: hashMessage1,
      },
      {
        goldId: id2,
        message: hashMessage2,
      },
    ];
    burnGold({
      p: p,
      projectId: 0,
      signature: result,
      address: address,
      goldNonceList: goldNonceList,
    })
      .then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200) {
            notification("Burn gold successfully", "top-center", 1);
            setTimeout(() => {
              toast.dismiss();
            }, 2000);
          } else {
            notification("Burn gold failed");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        notification("Burn gold failed");
      });
  };

  const heightFix = () => {
    if (testimonials.current && testimonials.current.parentElement)
      testimonials.current.parentElement.style.height = `${testimonials.current.clientHeight}px`;
  };

  const scrollToTop = () => {
    // @ts-ignore
    childRef.current?.scrollToTop();
    document.getElementById("creates")!.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleShowCreates = (e: any) => {
    if (e.target.checked) {
      setShowCreates(true);
      localforage.setItem("showCreates", "true");
    } else {
      setShowCreates(false);
      localforage.setItem("showCreates", "false");
    }
  };

  useEffect(() => {
    heightFix();
    localforage
      .getItem("showCreates")
      .then((value: any) => {
        if (value && value === "true") {
          document.getElementById("slideThree")!.click();
          setShowCreates(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowCreates(false);
      });
  }, []);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative pb-12 md:pb-20">
          {/* Particles animation */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-6">
            <Particles
              className="absolute inset-0 -z-10"
              quantity={10}
              staticity={40}
            />
          </div>

          {/* mobile Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_40%,theme(colors.white))]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-slate-400/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-slate-900 after:m-px before:-z-20 after:-z-20">
                {items.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    className="absolute inset-0 h-full -z-10"
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0 -rotate-[60deg]"
                    enterTo="opacity-100 rotate-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 rotate-0"
                    leaveTo="opacity-0 rotate-[60deg]"
                    beforeEnter={() => heightFix()}
                  >
                    <img
                      className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                      src={item.img}
                      width={56}
                      height={56}
                      alt={item.name}
                    />
                  </Transition>
                ))}
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out">
              <div className="relative flex flex-col" ref={testimonials}>
                {items.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-in-out duration-500 delay-200 order-first"
                    enterFrom="opacity-0 -translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-out duration-300 delay-300 absolute"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
                      {item.quote}
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out h-6">
              <BurnModal
                title={"Burn Gold Creates"}
                button={"Close"}
                showModal={showBurnModal}
                callback={() => setShowBurnModal(false)}
                confirm={handleBurnGold}
              />
              <div className="flex w-full item-center justify-between">
                <div className="slideThree">
                  <input
                    type="checkbox"
                    value="None"
                    id="slideThree"
                    name="check"
                    onChange={(e) => handleShowCreates(e)}
                  />
                  <label htmlFor="slideThree"></label>
                </div>
                {address ? (
                  <button
                    onClick={() => setShowBurnModal(true)}
                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mx-3 min-w-[132px]"
                  >
                    Burn Gold Creates
                  </button>
                ) : null}
              </div>
            </div>
            {/* list */}
            <CreatesList
              onRef={childRef}
              showCreates={showCreates}
              active={active.toString()}
            />
            {/* Buttons */}
            <div className="flex flex-wrap justify-center m-1.5">
              {items.map((item, index) => (
                <button
                  className={`btn-sm m-1.5 text-xs py-1.5 text-slate-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none ${
                    active === index
                      ? "opacity-100"
                      : "opacity-30 hover:opacity-60"
                  }`}
                  key={index}
                  onClick={() => {
                    setActive(index);
                  }}
                >
                  <span className="relative">
                    <span className="text-slate-50">{item.name}</span>{" "}
                  </span>
                </button>
              ))}
            </div>
            <div className="sticky bottom-6 animate-bounce flex justify-center w-full md:hidden ">
              <div onClick={scrollToTop} className="arrow-top mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { BURN_CREATES, CLAIM_CREATES } from "@/constants";
import { IGoldCreates, IUserCreates } from "@/types";
import {
  burnGold,
  getGoldPairDetail,
  getUserCreates,
  revealGold,
} from "@/utils/request";
import { crypto } from "@okxweb3/coin-bitcoin";
import copy from "copy-to-clipboard";
import localforage from "localforage";
import toast from "react-hot-toast";
import { useInfiniteQuery } from "react-query";
import BurnModal from "../BurnModal";
import GoldModal from "../GoldModal";
import { notification } from "../Notiofication";
import { ConnectContext } from "../provider/ConnectProvider";

function CreatesList({
  active,
  showCreates,
  onRef,
}: {
  active: string;
  showCreates: boolean;
  onRef: any;
}) {
  const { address, p } = useContext(ConnectContext);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string>("");

  const projectId = 0;

  useImperativeHandle(onRef, () => {
    // 需要将暴露的接口返回出去
    return {
      scrollToTop: scrollToTop,
    };
  });

  async function fetchServerPage(
    projectId: number,
    address: string,
    type: string,
    page: number = 0
  ): Promise<{ rows: IUserCreates[]; hasNextPage: boolean; page: number }> {
    const response = await getUserCreates({
      projectId,
      address,
      type,
      pageNum: page,
    });
    const data = await response.json();

    console.log(hasNextPage);

    return {
      rows: data.data.createsList,
      hasNextPage: data.data.hasNextPage,
      page: data.data.page,
    };
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects", projectId, address, active],
    ({ pageParam = 1 }) =>
      fetchServerPage(projectId, address, active, pageParam),
    {
      getNextPageParam: (_lastGroup, groups) => {
        return _lastGroup.hasNextPage ? _lastGroup.page + 1 : undefined;
      },
    }
  );
  const parentRef = useRef<HTMLDivElement>(null);
  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  const scrollToTop = () => {
    rowVirtualizer.scrollToIndex(0);
  };

  const handleGoldDetail = (mintId: number) => {
    getGoldPairDetail(0, address, mintId)
      .then((response) => {
        response.json().then((data: any) => {
          if (data.code === 200) {
            setResultInfo(data.data);
            setShowResult(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRevealGold = async (id: number, nonce: string) => {
    const hashMessage = crypto.sha256(Buffer.from(nonce)).toString("hex");
    nonce = CLAIM_CREATES.replace("$", hashMessage);
    // @ts-ignore
    const result = await (window as any).okxwallet.bitcoin
      .signMessage(address, {
        from: address,
        type: "ecdsa",
      })
      .catch((err: any) => {
        notification("User cancel");
        return;
      });

    if (result) {
      revealGold({
        projectId: 0,
        goldId: id,
        p: p,
        address: address,
        message: nonce,
        signature: result,
      })
        .then((response) => {
          response.json().then((data: any) => {
            if (data.code === 200) {
              if (data.data === "1") {
                localforage
                  .getItem("nonce")
                  .then((value: any) => {
                    if (value && value.length > 0) {
                      let nextId = id % 2 === 0 ? id - 1 : id + 1;
                      for (let i = 0; i < value.length; i++) {
                        if (value[i].id === id) {
                          value.splice(i, 1);
                        }
                        if (value[i].id === nextId) {
                          value.splice(i, 1);
                        }
                      }
                    }
                  })
                  .catch((err) => {});

                notification("Reveal gold successfully", "top-center", 1);
              }
              if (data.data === "2") {
                localforage
                  .getItem("nonce")
                  .then((value: any) => {
                    if (value && value.length > 0) {
                      value.forEach((item: any) => {
                        if (item.id === id) {
                          item.nonce = nonce;
                        }
                      });
                      localforage.setItem("nonce", value);
                    } else {
                      localforage.setItem("nonce", [{ id: id, nonce: nonce }]);
                    }
                  })
                  .catch((err) => {});

                notification("Wait for reveal gold", "top-center", 1);
              }
              setTimeout(() => {
                toast.dismiss();
              }, 2000);
            } else {
              notification("Reveal gold failed");
            }
          });
        })
        .catch((err) => {
          console.log(err);
          notification("Reveal gold failed");
        })
        .finally(() => {
          setShowResult(false);
        });
    }
  };

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }
    if (
      address &&
      !showCreates &&
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    address,
    showCreates,
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <>
      {status === "loading" ? (
        <div
          ref={parentRef}
          className="rounded-lg border-[2px] border-solid border-[#e5e7eb] relative flex justify-center items-center"
          style={{
            height: `800px`,
            width: `100%`,
            overflow: "auto",
          }}
        >
          <div className="loading-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loading"></div>
            <div id="loading-text">loading</div>
          </div>
        </div>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : address ? (
        allRows.length > 0 ? (
          <div>
            {isFetching && !isFetchingNextPage ? (
              <div className="loading-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="loading"></div>
                <div id="loading-text">loading</div>
              </div>
            ) : null}
            <div
              ref={parentRef}
              className={
                (isFetching && !isFetchingNextPage) || !showCreates
                  ? `mask-deep overflow-hidden rounded-lg border-[2px] border-solid border-[#e5e7eb] relative`
                  : `overflow-auto rounded-lg border-[2px] border-solid border-[#e5e7eb] relative`
              }
              style={{
                height: `800px`,
                width: `100%`,
              }}
            >
              <GoldModal
                showModal={showResult}
                callback={() => setShowResult(false)}
                confirm={handleRevealGold}
                title={"Gold Detail"}
                content={resultInfo}
                button={"Close"}
              />
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
                className=""
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const isLoaderRow = virtualRow.index > allRows.length - 1;
                  let box = allRows[virtualRow.index];

                  return (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      className="border-b-[1px] border-solid border-[#e5e7eb] py-1 text-base tracking-[2px]"
                    >
                      {isLoaderRow ? (
                        // hasNextPage ? (
                        //   "Loading more..."
                        // ) : (
                        //   "Nothing more to load"
                        // )
                        ""
                      ) : (
                        <>
                          {active === "0" && (
                            <div className="flex w-full justify-between items-center px-4">
                              <div className="flex flex-1 justify-start item-center">
                                <img
                                  className="relative rounded-[3px] text-center"
                                  src={`/images/gicon.png`}
                                  width={56}
                                  height={56}
                                  alt={""}
                                />
                                <div className="flex flex-row items-center">
                                  <h1 className="w-full pl-2">#{box.id}</h1>
                                </div>
                              </div>

                              <div className="flex flex-row md:space-x-2 items-center min-w-[25%] text-xxs lg:text-base">
                                {box.used === "1" ? (
                                  <div className="flex items-center w-full text-base">
                                    <h1 className="text-center font-bold w-full cursor-pointer sign fpink z-10">
                                      Used
                                    </h1>
                                  </div>
                                ) : box.used !== "3" ? (
                                  <>
                                    <h1
                                      onClick={() =>
                                        handleGoldDetail(box.mintId)
                                      }
                                      className="text-center font-bold w-full cursor-pointer sign fpink z-10 md:min-w-[80px] min-w-[120px]"
                                    >
                                      Input #
                                      {box.id % 2 === 0
                                        ? `${box.id - 1}`
                                        : `${box.id + 1}`}
                                      &nbsp;key
                                    </h1>
                                    <span className="md:block hidden"> | </span>
                                    <h1
                                      onClick={() => {
                                        localforage
                                          .getItem(address)
                                          .then((value: any) => {
                                            if (value && value.length > 0) {
                                              value.forEach(
                                                (item: IGoldCreates) => {
                                                  if (
                                                    item.mintId === box.mintId
                                                  ) {
                                                    copy(item.nonce);
                                                    toast.dismiss();
                                                    notification(
                                                      `Copy ${box.id} nonce successfully`,
                                                      "top-center",
                                                      1
                                                    );
                                                    setTimeout(() => {
                                                      toast.dismiss();
                                                    }, 2000);
                                                  }
                                                }
                                              );
                                            } else {
                                              toast.dismiss();
                                              notification(
                                                "Can't get address gold info"
                                              );
                                              setTimeout(() => {
                                                toast.dismiss();
                                              }, 2000);
                                            }
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            toast.dismiss();
                                            notification(
                                              "Can't get address gold info"
                                            );
                                            setTimeout(() => {
                                              toast.dismiss();
                                            }, 2000);
                                          });
                                      }}
                                      className="text-center font-bold w-full cursor-pointer sign fpink z-10"
                                    >
                                      Copy #{box.id} key
                                    </h1>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex items-center w-full text-base">
                                      <h1 className="text-center font-bold w-full cursor-pointer sign fpink z-10">
                                        Burned
                                      </h1>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {active === "1" && (
                            <div className="flex w-full justify-between items-center px-4">
                              <div className="flex flex-1 justify-start item-center">
                                <img
                                  className="relative rounded-[3px] text-center"
                                  src={`/images/sicon.png`}
                                  width={56}
                                  height={56}
                                  alt={""}
                                />
                                <div className="flex flex-row items-center">
                                  <h1 className="w-full pl-2">#{box.id}</h1>
                                </div>
                              </div>
                              <div className="flex flex-row items-center">
                                <h1
                                  className="text-right font-bold w-full cursor-pointer sign fpink z-10"
                                  onClick={() => {
                                    copy(
                                      `${process.env.NEXT_PUBLIC_SILVER_URL}?link=${box.link}`
                                    );
                                    toast.dismiss();
                                    notification(
                                      `Copy ${box.mintId} successfully`,
                                      "top-center",
                                      1
                                    );
                                    setTimeout(() => {
                                      toast.dismiss();
                                    }, 2000);
                                  }}
                                >
                                  share ({box.shareCount})
                                </h1>
                              </div>
                            </div>
                          )}
                          {active === "2" && (
                            <div className="flex w-full justify-between items-center px-4">
                              <div className="flex flex-1 justify-start item-center">
                                <img
                                  className="relative rounded-[3px] text-center"
                                  src={`/images/bicon.png`}
                                  width={56}
                                  height={56}
                                  alt={""}
                                />
                                <div className="flex flex-row items-center">
                                  <h1 className="w-full pl-2">#{box.id}</h1>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={parentRef}
            className={
              (isFetching && !isFetchingNextPage) || !showCreates
                ? `mask-deep overflow-hidden rounded-lg border-[2px] border-solid border-[#e5e7eb] relative flex justify-center items-center`
                : `overflow-auto rounded-lg border-[2px] border-solid border-[#e5e7eb] relative flex justify-center items-center`
            }
            style={{
              height: `800px`,
              width: `100%`,
              overflow: "auto",
            }}
          >
            No data
          </div>
        )
      ) : (
        <div
          ref={parentRef}
          className="rounded-lg border-[2px] border-solid border-[#e5e7eb] relative flex justify-center items-center"
          style={{
            height: `800px`,
            width: `100%`,
            overflow: "auto",
          }}
        >
          Please connect wallet
        </div>
      )}
      {/* <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div> */}
    </>
  );
}
