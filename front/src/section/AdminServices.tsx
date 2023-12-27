import React, {useEffect, useState} from "react";
import { Customs, Forwarding, Road, Sea } from "../assets";
import axios from "axios";
import {Link} from "react-router-dom";

type Service = {
    id: number;
    title: string;
    image: string;
};

const AdminServices = () => {

    const [servicesList, setServicesList] = useState<Service[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_VAR_API_URL}/`)
            .then(response => {
                const updatedServicesList = response.data.texts
                    .filter((text: any) => text.title !== "О компании") // Exclude "О компании"
                    .map((text: any) => ({
                        id: text.id,
                        title: text.title,
                        image: getImageByTitle(text.title),
                    }));
                setServicesList(updatedServicesList);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const getImageByTitle = (title: string): string => {
        switch (title) {
            case 'ЭКСПЕДИРОВАНИЕ':
                return Forwarding;
            case 'ГРУЗОПЕРЕВОЗКИ ПО РОССИИ И СНГ':
                return Road;
            case 'МОРСКОЙ ФРАХТ':
                return Sea;
            case 'ТАМОЖЕННОЕ ОФОРМЛЕНИЕ':
                return Customs;
            default:
                return '';
        }
    };

    return (
        <div className="flex flex-col items-center  justify-center pb-10">
            <h1 className="text-center font-montserrat text-4xl font-semibold text-white mb-8  max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                <span className="text-main-yellow "> Редактирование текста: </span> <br />
                Услуги
            </h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-20 mx-10 mb-10 cursor-pointer max-lg:gap-10">
                {servicesList.map((service, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg border-2 border-main-yellow hover:ring-2 hover:ring-main-yellow animation-hover "
                    >
                        <Link to={`${service.id}`} key={service.id}>
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full  h-[450px] object-cover max-sm:h-[300px] "
                        />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-main-background bg-opacity-80 p-4">
                            <p className="text-white text-center font-montserrat font-semibold text-xl max-sm:text-base uppercase">
                                {service.title}
                            </p>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
