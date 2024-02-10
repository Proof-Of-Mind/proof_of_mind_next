"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export interface IAppProps {
  showModal: boolean;
  callback: () => void;
  confirm: (id: number, nonce: string) => void;
  title: string;
  content: any;
  button: string;
}

export default function GoldModal(props: IAppProps) {
  const [textValue, setTextValue] = useState("");

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
            <div className="relative inline-block align-bottom bg-black border-solid border-2 border-white rounded-[.1875rem] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-2xl sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="flex-1 mt-3 text-center sm:mt-0 sm:ml-4 overflow-hidden">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-300"
                  >
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-4 pb-2 md:flex md:space-x-10 flex-nowrap items-center justify-center z-[1] relative overflow-x-auto overflow-y-hidden">
                    {props.content && props.content.length > 0 && (
                      <>
                        <div
                          className="card w-[300px] h-[400px] sm:w-[200px] sm:h-[300px] flex-none relative"
                          key={0}
                          id={`card-${0}`}
                        >
                          <div
                            id={`card-item-${0}`}
                            className={`card-item flex flex-col items-start justify-start pt-4 relative item-0`}
                          >
                            <h1 className="inline-block text-left w-full pl-4">
                              #{props.content[0].id}
                            </h1>
                            {props.content[0].used ? (
                              <input
                                className="absolute top-[88%] w-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-solid border-2 rounded-lg focus:ring-0 focus:border-info-modal outline-none focus:outline-none text-base text-black z-10"
                                placeholder="Input nonce"
                                onChange={(e) => setTextValue(e.target.value)}
                              ></input>
                            ) : (
                              <span className="absolute top-[88%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-base font-bold text-white">
                                Already entered
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="arrow mx-auto rotate-90 md:rotate-0"></div>
                        <div
                          className="card w-[300px] h-[400px] sm:w-[200px] sm:h-[300px] flex-none relative"
                          id={`card-1`}
                        >
                          <div
                            id={`card-item-${1}`}
                            className={`${
                              props.content[1].id !== null
                                ? "card-item flex flex-col items-start justify-start pt-4 relative item-0"
                                : "card-item flex flex-col items-start justify-start pt-4 relative item-3"
                            }`}
                          >
                            <h1 className="inline-block text-left w-full pl-4">
                              {props.content[1].id && `#${props.content[1].id}`}
                            </h1>
                            <span className="absolute top-[88%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-bold">
                              {props.content[1].id && `GOLD`}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:justify-center space-y-2 md:space-y-0">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.confirm(props.content[0].id, textValue)}
                >
                  Confirm
                </button>
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
