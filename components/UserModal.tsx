"use client";
import { IUserInfo } from "@/types";
import { getReferralCode, getUserInfo } from "@/utils/request";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import copy from "copy-to-clipboard";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { notification } from "./Notiofication";

export interface IAppProps {
  showModal: boolean;
  callback: () => void;
  title: string;
  button: string;
}

export default function UserModal(props: IAppProps) {
  const { publicKey } = useWallet();
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  const getUserDetail = (projectId: number, address: string) => {
    getUserInfo(projectId, address).then((res) => {
      res.json().then((data) => {
        if (data.code === 200) {
          setUserInfo(data.data);
        }
      });
    });
  };

  const handleCopyLink = () => {
    getReferralCode(0, publicKey?.toBase58())
      .then((res) => {
        res.json().then((data) => {
          if (data.code === 200) {
            copy(
              process.env.NEXT_PUBLIC_BASE_URL + "?referralCode=" + data.data
            );
            notification(`Copy link successfully`, "top-center", 1);
          } else {
            notification(`Copy link failed`, "top-center", 1);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        notification(`Copy link failed`, "top-center", 1);
      });
  };

  useEffect(() => {
    if (publicKey?.toBase58() && props.showModal) {
      getUserDetail(0, publicKey!.toBase58());
    }
  }, [publicKey?.toBase58(), props.showModal]);

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
            <div className="relative inline-block align-bottom bg-black border-solid border-2 border-white rounded-[.1875rem] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:min-w-[600px] sm:my-8 sm:align-middle sm:max-w-screen-2xl sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="flex-1 mt-3 text-center sm:mt-0 sm:ml-4 overflow-hidden">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-300"
                  >
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-4 pb-2 flex flex-nowrap items-center justify-start space-x-10 z-[1] relative overflow-x-auto overflow-y-hidden">
                    <>
                      <div className="flex flex-col space-y-2 items-start justify-start">
                        <div>
                          <span>Address: </span>
                          <span
                            className="cursor-pointer text-[8px] sm:text-base"
                            onClick={() => {
                              copy(publicKey!.toBase58());
                              toast.dismiss();
                              notification(
                                `Copy ${
                                  publicKey!.toBase58().substr(0, 6) +
                                  "..." +
                                  publicKey!.toBase58().substr(-4)
                                } successfully`,
                                "top-center",
                                1
                              );
                              setTimeout(() => {
                                toast.dismiss();
                              }, 2000);
                            }}
                          >
                            {" "}
                            {publicKey ? publicKey.toBase58() : ""}
                          </span>
                        </div>
                        <span>
                          Total:
                          <span className="cursor-pointer text-[8px] sm:text-base">
                            &nbsp;{userInfo?.total}
                          </span>
                        </span>
                        <span>
                          Total Claim:
                          <span className="cursor-pointer text-[8px] sm:text-base">
                            &nbsp;{userInfo?.totalClaimed}
                          </span>
                        </span>
                        <span>
                          Referral:
                          <span
                            className="cursor-pointer text-[8px] sm:text-base"
                            onClick={() => {
                              copy(userInfo!.referralAddress);
                              toast.dismiss();
                              notification(
                                `Copy ${
                                  userInfo?.referralAddress.substr(0, 6) +
                                  "..." +
                                  userInfo?.referralAddress.substr(-4)
                                } successfully`,
                                "top-center",
                                1
                              );
                              setTimeout(() => {
                                toast.dismiss();
                              }, 2000);
                            }}
                          >
                            &nbsp;
                            {userInfo?.referralAddress
                              ? userInfo?.referralAddress
                              : ""}
                          </span>
                        </span>
                        <span>
                          Referral Earnings:
                          <span className="cursor-pointer text-[8px] sm:text-base">
                            &nbsp;{userInfo?.earnings}
                          </span>
                        </span>
                        <button
                          className="button pl-1"
                          onClick={() => handleCopyLink()}
                        >
                          <span className="button-outline">
                            <span className="button-inside">
                              <span className="button-text visually-hidden">
                                COPY REFERRAL LINK
                              </span>
                              <span
                                className="button-text-characters-container"
                                aria-hidden="true"
                              ></span>
                            </span>
                          </span>
                        </button>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:justify-center space-y-2 md:space-y-0">
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
