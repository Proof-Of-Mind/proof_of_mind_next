"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { notification } from "./Notiofication";

export interface IAppProps {
  showModal: boolean;
  callback: () => void;
  confirm: (id1: number, nonce1: string, id2: number, nonce2: string) => void;
  title: string;
  button: string;
}

export default function BurnModal(props: IAppProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = () => {
    let id_1;
    let nocne_1;
    let id_2;
    let nocne_2;

    const inputs = formRef.current?.querySelectorAll("input")!;

    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      switch (input.id) {
        case "id_1":
          id_1 = Number(input.value);
          break;
        case "nonce_1":
          nocne_1 = input.value;
          break;
        case "id_2":
          id_2 = Number(input.value);
          break;
        case "nonce_2":
          nocne_2 = input.value;
          break;
      }
    }
    if (id_1 && nocne_1 && id_2 && nocne_2) {
      props.confirm(id_1, nocne_1, id_2, nocne_2);
    } else {
      notification("Please fill all fields");
      return;
    }
    props.callback();
  };

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
                  <div className="mt-4 pb-2 flex flex-nowrap items-center justify-center space-x-10 z-[1] relative overflow-x-auto overflow-y-hidden">
                    {/* <div className="mt-4 pb-2 xl:grid xl:grid-cols-5 xl:gap-4 xl:overflow-hidden xl:space-x-0 flex flex-nowrap space-x-10 overflow-x-auto overflow-y-hidden items-center justify-start z-[1] relative"> */}
                    <>
                      <div
                        className="card w-[300px] h-[400px] flex-none relative"
                        id={`card-0`}
                      >
                        <div
                          id={`card-item-0`}
                          className={`card-item flex flex-col items-start justify-start pt-4 relative item-4`}
                        ></div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col space-y-4 items-center justify-center"
                ref={formRef}
              >
                <div className="flex space-x-4">
                  <input
                    className="w-[64px] border-solid border-2 rounded-lg focus:ring-0 focus:border-info-modal outline-none focus:outline-none text-black font-mono z-10"
                    placeholder="id_1"
                    id="id_1"
                  ></input>
                  <input
                    className="w-[128px] border-solid border-2 rounded-lg focus:ring-0 focus:border-info-modal outline-none focus:outline-none  text-black font-mono z-10"
                    placeholder="nonce_1"
                    maxLength={80}
                    id="nonce_1"
                  ></input>
                </div>
                <div className="flex space-x-4">
                  <input
                    className="w-[64px] border-solid border-2 rounded-lg focus:ring-0 focus:border-info-modal outline-none focus:outline-none  text-black font-mono z-10"
                    placeholder="id_2"
                    id="id_2"
                  ></input>
                  <input
                    className="w-[128px] border-solid border-2 rounded-lg focus:ring-0 focus:border-info-modal outline-none focus:outline-none  text-black font-mono z-10"
                    placeholder="nonce_2"
                    maxLength={80}
                    id="nonce_2"
                  ></input>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:justify-center space-y-2 md:space-y-0">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 text-base font-medium text-white 0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleFormSubmit()}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
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
