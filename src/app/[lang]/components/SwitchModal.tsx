"use client";

import React, { useState, useEffect, useReducer } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "../../../../i18n-config";
import { FaRegWindowClose, FaCheck } from "react-icons/fa";
import { initialState, i18nReducer, LangState } from "../../GlobalRedux/store";

type Link = {
  href: string;
  label: string;
};
interface ItemLocalePair {
  item: Link;
  locale: string;
}
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const dropdown: Link[] = [
  { href: "en", label: "English" },
  { href: "es", label: "Spanish " },
  { href: "pt", label: "Portuguese " },
  { href: "ja", label: "Japanese " },
  {
    href: "ms-MY",
    label: "Malaysian ",
  },
  { href: "nl", label: "Dutch" },
];

const itemsWithLocale: ItemLocalePair[] = dropdown.map((item, index) => {
  const locale = i18n.locales[index % i18n.locales.length];
  return { item, locale };
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [state, dispatch] = useReducer(
    (state: LangState, action: any) => i18nReducer(state, action, dropdown),
    initialState
  );

  const [initialLangState, setInitialLangState] = useState(initialState);
  useEffect(() => {
    const storedState = window.localStorage.getItem("selectedLanguage");
    const parsedState = storedState ? JSON.parse(storedState) : initialState;

    setInitialLangState(parsedState);
  }, []);

  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const showModal = () => {
    const modal = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      {/* The Modal */}
      <dialog id="my_modal_1" className="modal " open={isOpen}>
        <div className="modal-box ">
          <div className="relative bg-white  rounded-xl p-4 md:px-16 md:py-16 text-black dark:text-white">
            <FaRegWindowClose
              className="absolute right-3 top-3 cursor-pointer "
              aria-label="close modal"
              onClick={() => onClose()}
            />

            <div className="capitalize font-semibold text-[22px] mb-8 text-center">
              <span>
                <span className="false">select language</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[15px]">
              {itemsWithLocale.map(({ item, locale }) => (
                <Link
                  key={`${item.href}_${locale}`}
                  href={redirectedPathName(locale)}
                  className={`cursor-pointer flex justify-between items-center border-b border-b-[#E0E0E0] py-2 pl-2 false font-semibold text-left`}
                  onClick={() => {
                    dispatch({ type: "CHANGE_LANGUAGE", payload: locale });
                  }}
                >
                  <span className="text-base font-medium">{item.label}</span>
                  {state.lang === locale && (
                    <span>
                      <FaCheck />
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* Button to close the modal */}
                {/* <button className="btn" onClick={() => onClose()}>
                  Close
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
