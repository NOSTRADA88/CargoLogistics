import { useState } from "react";
import { Logo } from "../assets";
import Order from "./Order";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "О компании" },
  { href: "#contact", label: "Контакты" },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsMenuOpen(false); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-bg-main w-full py-3 px-20 flex justify-between items-center relative">
      <img src={Logo} alt="logo" className="max-sm:w-32 max-sm:mr-10" />

      <div className="flex gap-20 justify-center items-center max-xl:gap-10 max-lg:hidden">
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const targetElement = document.getElementById(item.href.substring(1));
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: "smooth",
                });
              }
            }}
            className="text-nav-text font-montserrat text-base font-medium 
                        transition-all duration-300 ease-in-out hover:text-white active:text-white relative"
          >
            {item.label}
            <span className="nav-link-hover-line"></span>
          </a>
        ))}
      </div>

      <button
        className="bg-main-yellow rounded-md py-3 px-6 cursor-pointer text-black font-montserrat text-base font-semibold
                max-md:hidden"
        onClick={openModal}
      >
        Заказать звонок
      </button>

      <button
        onClick={toggleMenu}
        className="text-white text-2xl font-montserrat cursor-pointer  hidden max-lg:block "
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {isMenuOpen && (
        <div className=" bg-bg-main absolute top-full left-0 w-full shadow-md ">
          <hr className="w-full border-t h-[1px] border-main-yellow" />
          <div className="flex flex-col items-center justify-center">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById(item.href.substring(1));
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 100,
                      behavior: "smooth",
                    });
                  }
                }}
                className="text-nav-text font-montserrat text-base  font-medium p-8
                   transition-all duration-300 ease-in-out hover:text-white active:text-white relative block mb-2"
              >
                {item.label}
                <span className="nav-link-hover-line"></span>
              </a>
            ))}
            <button
              className="bg-main-yellow rounded-md py-3 px-3 cursor-pointer text-black font-montserrat text-base font-semibold
                             hidden max-md:block mb-10"
              onClick={openModal}
            >
              Заказать звонок
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
       <Order closeModal={closeModal}/>
      )}
    </div>
  );
};

export default Nav;
