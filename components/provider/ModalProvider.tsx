"use client";
import { createContext, useState } from "react";

interface ModalContextType {
  showModal: boolean;
  title: string;
  content: string;
  button: string;
  open: (title: string, content: string, button: string) => void;
  close: () => void;
}

const defaultState: ModalContextType = {
  showModal: false,
  title: "",
  content: "",
  button: "",
  open: () => {},
  close: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultState);

export const ModalProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [button, setButton] = useState("");

  const open = (title: string, content: string, button: string) => {
    setTitle(title);
    setContent(content);
    setButton(button);
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        title,
        content,
        button,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
