import { useState } from "react";
import InputMask from 'react-input-mask';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Email, Location, Phone } from "../assets";

const Contact = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm()

  const recordForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      const currentUrl = window.location.href;
      data.url = currentUrl;
      if (data.text) {
        data.text = `Запись на консультацию. Вид обращения: [${data.text}]`;
      } else {
        data.text = "Запись на консультацию";
      }
      const response = await axios.post(
        `/api/feedback/store`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Данные успешно отправлены");
        reset();
        setErrors({});
        setValue("phone", "");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Ошибка запроса:", error);
      }
    }
  };

  return (

    <div id='contact' className="flex pt-10  mx-20 pb-32 max-2xl:flex-col max-2xl:justify-center max-lg:mx-10 max-sm:mx-8">

      <div className="flex flex-col items-center justify-start w-1/2 pr-10 mt-20 max-2xl:w-full max-lg:mt-5 ">
        <h2 className="text-main-yellow text-left font-montserrat text-4xl font-semibold leading-normal ">Контакты</h2>
        <div className="flex flex-col items-start justify-center gap-10 mt-10 ">
          <div className="flex gap-14 max-lg:gap-8 items-center">
            <img src={Phone} alt="phone" />
            <a href="tel:+79111016677" className="cursor-pointer text-white font-montserrat text-3xl font-normal leading-normal
             tracking-wide animation-hover  max-[1440px]-text-2xl max-lg:text-xl max-sm:text-base hover:text-nav-text">
              +7 (911) 101-66-77
            </a>
          </div>
          <div className="flex gap-14 max-lg:gap-8 items-center">
            <img src={Email} alt="phone" />
            <a href="mailto:info@cargo-logistics.spb.ru" className="cursor-pointer text-white font-montserrat text-3xl 
            font-normal leading-normal tracking-wide animation-hover max-[1440px]-text-2xl max-lg:text-xl max-sm:text-base hover:text-nav-text">
              info@cargo-logistics.spb.ru
            </a>
          </div>
          <div className="flex gap-14 max-lg:gap-8 items-center">
            <img src={Location} alt="location" />
            <a href="https://yandex.ru/maps/2/saint-petersburg/house/bumazhnaya_ulitsa_3/Z0kYdABhQEYFQFtjfXVxcnVgYg==/?ll=30.271924%2C59.903947&source=serp_navig&z=20.85"
              className="cursor-pointer text-white font-montserrat text-3xl font-normal leading-normal tracking-wide animation-hover max-[1440px]-text-2xl max-lg:text-xl max-sm:text-base hover:text-nav-text" target="_blank">
              190020, Россия, Санкт-Петербург, ул.<br /> Бумажная д. 3, офис 510</a>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-20 max-2xl:w-full max-2xl:px-20 max-lg:px-0  ">
        <div className="rounded-md border-2 border-solid border-yellow-500 bg-white shadow-md px-14 pb-10 max-lg:px-8">
          <h1 className="text-main-dark font-montserrat font-bold text-[32px] mt-12 text-center uppercase mb-6
           max-[1550px]:text-3xl max-[1440px]:text-2xl   max-[1440px]-text-2xl max-lg:text-xl max-sm:text-base
           max-xl:text-xl max-md:text-sm ">
            Оформите заявку на расчет!
          </h1>
          <form onSubmit={handleSubmit(recordForm)}>

            <div className="flex items-center  justify-between mb-5 max-lg:mt-2 max-md:flex-col ">
              <label className="w-[250px]  max-md:w-full">
                <span className="text-main-dark font-montserrat text-xl font-medium max-md:text-sm mr-2"> ФИО </span>
              </label>
              <div className=" flex flex-col w-full ">
                <input type="text" className="flex-grow rounded-[10px] h-12 pl-2  font-montserrat text-xl font-medium  bg-gray-300 p-2
                     max-[1440px]:text-base max-md:text-sm max-[500px]:h-10 max-md:w-full"
                  {...register("author")} />
                {errors.author && (
                  <div className="text-red-400">{errors.author[0]}</div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-5  max-md:flex-col">
              <label className="w-[250px]  max-md:w-full">
                <span className="text-main-dark font-montserrat text-xl font-medium max-md:text-sm  mr-2"> Номер телефона</span>
              </label>
              <div className=" flex flex-col w-full ">
                <InputMask
                  mask="+7 (999) 999-99-99"
                  className="flex-grow rounded-[10px] h-12 pl-2 font-montserrat text-xl font-medium bg-gray-300 p-2
                        max-[1440px]:text-base max-md:text-sm max-[500px]:h-10  max-md:w-full"

                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="text-red-400">{errors.phone[0]}</div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-5 max-md:flex-col ">
              <label className="w-[250px]  max-md:w-full">
                <span className="text-main-dark font-montserrat text-xl font-medium max-md:text-sm  mr-2"> E-mail</span>
              </label>
              <div className=" flex flex-col w-full ">
                <input type="text" className="flex-grow rounded-[10px] h-12 pl-2 font-montserrat text-xl font-medium bg-gray-300 p-2
                     max-[1440px]:text-base max-md:text-sm max-[500px]:h-10  max-md:w-full"
                  {...register("email")} />
                {errors.email && (
                  <div className="text-red-400">{errors.email[0]}</div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-5 max-md:flex-col ">
              <label className="w-[250px]  max-md:w-full">
                <span className="text-main-dark font-montserrat text-xl font-medium max-md:text-sm  mr-2"> Описание </span>
              </label>
              <div className=" flex flex-col w-full ">

                <textarea className="bg-gray-300 p-2 rounded-[10px]  h-48 max-h-60 min-h-48 max-lg:h-32" />

                {errors.description && (
                  <div className="text-red-400">{errors.description[0]}</div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-10  max-[500px]:mt-5 ">
              <button className="animation-hover hover:bg-slate-200 bg-main-yellow shadow-md 
                    rounded-[10px] px-8 py-4 text-[#202E40]  font-montserrat text-center
                     text-lg font-bold  uppercase max-md:text-sm max-md:py-4 max-[500px]:py-2">отправить</button>
            </div>
          </form>

        </div >
      </div >
    </div >

  )
}

export default Contact