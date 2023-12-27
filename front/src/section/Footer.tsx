import { useState } from "react";
import { Logo } from "../assets";
import Order from "./Order";

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Главная" },
        { href: "#services", label: "Услуги" },
        { href: "#about", label: "О компании" },
        { href: "#contact", label: "Контакты" },
    ];
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="pb-10">
            <div className="mx-16 max-lg:mx-10 max-sm:mx-8">
                <div className="flex justify-between max-lg:flex-col max-lg:items-start ">
                    <img src={Logo} alt="logo" className="max-sm:w-32 max-sm:mr-10 max-lg:mb-8" />
                    <div className="flex gap-20 justify-center items-center max-xl:gap-10 max-sm:flex-col max-sm:items-start max-sm:gap-8 ">
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
                                className="text-white font-montserrat text-2xl font-medium max-lg:text-xl max-sm:text-base
                     animation-hover  hover:text-nav-text active:text-nav-texte relative"
                            >
                                {item.label}
                                <span className="nav-link-hover-line"></span>
                            </a>
                        ))}
                    </div>

                </div>
                <div className="flex justify-between mt-10 max-2xl:flex-col max-2xl:items-start">
                    <div className="flex gap-5 flex-col">
                        <p className="text-white font-montserrat text-lg font-normal">Юридические документы</p>
                        <p className="text-main-gray font-montserrat text-lg font-normal max-2xl:mb-4">"Международный Таможенный Сервис"  | Все права защищены © 2005-2023</p>
                    </div>
                    <button
                        className="bg-main-yellow rounded-md py-3 px-8 cursor-pointer text-black font-montserrat text-3xl font-semibold
                        max-[1440px]-text-2xl max-lg:text-xl max-sm:text-base hover:bg-[#B4884F] animation-hover"
                        onClick={openModal}>
                        Заказать звонок
                    </button>
                </div>
                {isModalOpen && (
                    <Order closeModal={closeModal} />
                )}

            </div>
            <hr className="mt-8 w-full border-t h-[2px] border-main-lightgray  " />
            <div className="mx-16 mt-10 flex justify-between items-center max-2xl:flex-col max-2xl:items-start  max-lg:mx-10 max-sm:mx-8">
                <a href="https://yandex.ru/maps/2/saint-petersburg/house/bumazhnaya_ulitsa_3/Z0kYdABhQEYFQFtjfXVxcnVgYg==/?ll=30.271924%2C59.903947&source=serp_navig&z=20.85"
                    className="cursor-pointer text-main-gray font-montserrat text-lg font-normal
               leading-normal tracking-wide animation-hover max-sm:text-base hover:text-nav-text " target="_blank">
                    190020, Россия, Санкт-Петербург, ул. Бумажная д. 3, офис 510</a>
                <div className="flex justify-end gap-20  max-md:gap-10 max-sm:flex-col  max-sm:gap-4 max-sm:mt-4 ">
                    <a href="https://wa.me/79111016677" target="_blank"
                        className="cursor-pointer text-main-gray font-montserrat text-lg font-normal
               leading-normal tracking-wide animation-hover max-sm:text-base hover:text-nav-text" >
                        +7 (911) 101-66-77</a>
                    <a href="mailto:info@cargo-logistics.spb.ru"
                        className="cursor-pointer  text-main-gray font-montserrat text-lg font-normal
               leading-normal tracking-wide animation-hover max-sm:text-base hover:text-nav-text" >
                        info@cargo-logistics.spb.ru</a>
                </div>
            </div>
        </div>
    )
}

export default Footer