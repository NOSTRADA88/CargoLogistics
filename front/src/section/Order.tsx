import React, { useState, ChangeEvent } from "react";
import InputMask from "react-input-mask";

type OrderProps = {
    closeModal: () => void;
};

const Order = ({ closeModal }: OrderProps) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleAgreePrivacyChange = () => {
        setAgreePrivacy(!agreePrivacy);
    };

    const handleOrderButtonClick = () => {
        console.log(phoneNumber);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-bg-main p-10 rounded-[20px] max-sm:mx-2">
                <div className="flex justify-end">
                    <button
                        className="text-white text-2xl font-montserrat cursor-pointer "
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>
                <h1 className="text-white font-montserrat text-base font-bold leading-4 tracking-wide uppercase mb-2   max-sm:text-sm">
                    Укажите свой номер телефона
                </h1>

                <div className="mb-4 relative flex items-center border-b border-main-gray">
                    <span className="mr-2 text-white">+7</span>
                    <InputMask
                        mask="(999) 999-99-99"
                        maskChar="_"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="rounded-md py-2 px-2 text-white bg-transparent w-full outline-none"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            id="agreePrivacy"
                            checked={agreePrivacy}
                            onChange={handleAgreePrivacyChange}
                            className="mr-2 appearance-none border border-white rounded-sm p-2 focus:outline-none focus:border-main-yellow"
                        />
                        <span className="checkmark">&#10003;</span>
                    </label>
                    <label
                        className="text-main-gray bg-opacity-50 font-montserrat text-base font-normal leading-5 tracking-wide max-sm:text-xs"
                        htmlFor="agreePrivacy"
                    >
                        Оставляя свои личные данные, вы принимаете <br /> Соглашение о конфиденциальности
                    </label>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-main-yellow rounded-md py-3 px-6 cursor-pointer
             text-black font-montserrat text-base font-semibold  max-sm:text-sm hover:bg-[#B4884F] animation-hover"
                        onClick={handleOrderButtonClick}
                    >
                        Заказать звонок
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
