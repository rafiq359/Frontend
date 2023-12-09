"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGlobe } from "react-icons/fa";
import { useState } from "react";
import Modal from "./SwitchModal";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  lang: string | null;
}

function NavLink({ url, text, lang }: NavLink) {
  const path = usePathname();
  const langValue = lang || "en";

  return (
    <li className="flex">
      <Link
        prefetch
        href={`/${langValue}${url}`}
        className={`flex items-center mx-4 text-lg font-md -mb-1  rounded p-2 ${
          url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
  lang,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  lang: string | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className=" mx-auto">
        <div className="navbar border-b border-slate-200">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
              >
                {links.map((item: NavLink) => (
                  <NavLink
                    key={item.id}
                    url={item.url}
                    text={item.text}
                    lang={lang}
                    id={0}
                    newTab={false}
                  />
                ))}
              </ul>
            </div>
            <Logo src={logoUrl}>
              {/* {logoText && (
                <h2 className="text-2xl font-bold hidden sm:block">
                  {logoText}
                </h2>
              )} */}
            </Logo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((item: NavLink) => (
                <NavLink
                  key={item.id}
                  url={item.url}
                  text={item.text}
                  lang={lang}
                  id={0}
                  newTab={false}
                />
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <FaGlobe
              className="cursor-pointer text-[20px]"
              onClick={openModal}
            ></FaGlobe>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {/* <LocaleSwitcher isModalOpen={isModalOpen} closeModal={closeModal} /> */}
          </div>
        </div>
      </div>
    </>
    // <div className="pt-4">
    //   <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
    //     <Logo src={logoUrl}>
    //       {/* {logoText && (
    //         <h2 className="text-2xl font-bold hidden sm:block">{logoText}</h2>
    //       )} */}
    //     </Logo>

    //     <div className="items-center flex-shrink-0 hidden lg:flex">
    //       <ul className="items-stretch hidden text-white space-x-3 lg:flex">
    //         {links.map((item: NavLink) => (
    //           <NavLink
    //             key={item.id}
    //             url={item.url}
    //             text={item.text}
    //             lang={lang}
    //             id={0}
    //             newTab={false}
    //           />
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="text-white my-auto">
    //       <LocaleSwitcher />
    //     </div>
    //     <Dialog
    //       as="div"
    //       className="lg:hidden"
    //       open={mobileMenuOpen}
    //       onClose={setMobileMenuOpen}
    //     >
    //       <div className="fixed inset-0 z-50" />
    //       <Dialog.Panel className="fixed top-20 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
    //         <div className="mt-6 flow-root">
    //           <div className="-my-6 divide-y divide-gray-200/10">
    //             <div className="space-y-2 py-6">
    //               {links.map((item) => (
    //                 <MobileNavLink
    //                   key={item.id}
    //                   closeMenu={closeMenu}
    //                   {...item}
    //                 />
    //               ))}
    //               <div className="w-24 bg-white"></div>
    //             </div>
    //           </div>
    //         </div>
    //       </Dialog.Panel>
    //     </Dialog>
    //     <button
    //       className="p-4 lg:hidden"
    //       onClick={() => setMobileMenuOpen(true)}
    //     >
    //       {mobileMenuOpen ? (
    //         <XMarkIcon className="h-7 w-7 text-gray-100" aria-hidden="true" />
    //       ) : (
    //         <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true" />
    //       )}
    //     </button>
    //   </div>
    // </div>
  );
}
