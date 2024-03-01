"use client";
import { Dialog, Transition } from "@headlessui/react";
import copy from "copy-to-clipboard";
import { Fragment, Key, useEffect } from "react";
import toast from "react-hot-toast";
import { notification } from "./Notiofication";

export interface IAppProps {
  showModal: boolean;
  callback: () => void;
  title: string;
  content: any;
  button: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SILVER_URL;

export default function ResultModal(props: IAppProps) {
  const processCss = (type: string) => {
    if (type === "2") {
      return "card-item flex flex-col items-start justify-start pt-4 relative item-2";
    }
    if (type === "1") {
      return "card-item flex flex-col items-start justify-start pt-4 relative item-1";
    }
    if (type === "0") {
      return "card-item flex flex-col items-start justify-start pt-4 relative item-0";
    }
    return "";
  };

  const mapCreatesType = (item: any) => {
    if (item.createsType === "2") {
      return "BRONZE";
    }
    if (item.createsType === "1") {
      return "SILVER";
    }
    if (item.createsType === "0") {
      return "GOLD";
    }
    return "";
  };

  function transformElement(
    element: any,
    multiple: number,
    img: any,
    x: number,
    y: number
  ) {
    let box = element.getBoundingClientRect();
    const calcX = -(y - box.y - box.height / 2) / multiple;
    const calcY = (x - box.x - box.width / 2) / multiple;
    const percentage = parseInt(((x - box.x) / box.width) * 1000 + "") / 10;
    element.style.transform =
      "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
    img.style = `--per: ${percentage}%`;
  }

  const addTransform = (index: number) => {
    const multiple = 15;
    const card = document.getElementById(`card-${index}`)!;
    const cardItem = document.getElementById(`card-item-${index}`)!;

    const moveEvent = (e: { clientX: number; clientY: number }) => {
      window.requestAnimationFrame(function () {
        transformElement(card, multiple, cardItem, e.clientX, e.clientY);
      });
    };

    const leaveEvent = () => {
      window.requestAnimationFrame(function () {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    };

    if (card) {
      card.addEventListener("mousemove", moveEvent);
      card.addEventListener("mouseleave", leaveEvent);
    }

    return () => {
      card.removeEventListener("mousemove", moveEvent);
      card.removeEventListener("mouseleave", leaveEvent);
    };
  };

  useEffect(() => {
    if (props.showModal) {
      setTimeout(() => {
        props.content.createsInfoList.map((item: any, index: number) => {
          addTransform(index);
        });
      }, 2000);
    }
  }, [props.showModal, props.content]);

  return (
    <Transition.Root show={props.showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        onClose={props.callback}
      >
        <div className="flex sm:items-end items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 mask transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-black border-solid border-2 border-white rounded-[.1875rem] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-2xl w-full sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="flex-1 mt-3 text-center sm:mt-0 sm:ml-4 overflow-hidden">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-300"
                  >
                    {props.title}
                  </Dialog.Title>
                  {/* <div className="mt-4 pb-2 flex flex-nowrap items-center justify-start space-x-10 z-[1] relative overflow-x-auto overflow-y-hidden"> */}
                  <div className="mt-4 pb-2 xl:grid xl:grid-cols-5 xl:gap-4 xl:overflow-hidden xl:space-x-0 flex flex-nowrap space-x-10 overflow-x-auto overflow-y-hidden items-center justify-start z-[1] relative">
                    {props.content.createsInfoList &&
                      props.content.createsInfoList.map(
                        (item: any, index: Key | null | undefined) => {
                          return (
                            <div
                              className="card w-[300px] h-[400px] sm:w-[200px] sm:h-[300px] flex-none relative"
                              key={index}
                              id={`card-${index}`}
                            >
                              <div
                                id={`card-item-${index}`}
                                className={processCss(item.createsType)}
                              >
                                {item.createsType === "1" ? (
                                  <div className="flex w-full">
                                    <h1 className="text-left w-full pl-4 ">
                                      #{item.id}
                                    </h1>
                                    <h1
                                      className="text-right font-bold w-full pr-4 cursor-pointer sign fpink z-10"
                                      onClick={() => {
                                        copy(`${BASE_URL}?link=${item.linkId}`);
                                        toast.dismiss();
                                        notification(
                                          `Copy ${item.id} successfully`,
                                          "top-center",
                                          1
                                        );
                                        setTimeout(() => {
                                          toast.dismiss();
                                        }, 2000);
                                      }}
                                    >
                                      share
                                    </h1>
                                  </div>
                                ) : (
                                  <h1 className="inline-block text-left w-full pl-4">
                                    #{item.id}
                                  </h1>
                                )}
                                <span className="absolute top-[88%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-bold">
                                  {mapCreatesType(item)}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={props.callback}
                >
                  {props.button}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
