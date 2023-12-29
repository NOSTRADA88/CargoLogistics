import { useEffect, useState } from "react";
import { Customs, Forwarding, Road, Sea, ServicesSection } from "../assets";
import { AboutServices } from "../section";
import axios from "axios";

type Service = {
    id: string;
    title: string;
    image: string;
    text: string;
};

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const openModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedService(null);
        setIsModalOpen(false);
    };

    const [servicesList, setServicesList] = useState<Service[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_VAR_API_URL}/`)
            .then(response => {
                const updatedServicesList = response.data.texts
                    .filter((text: any) => text.title !== "О компании")
                    .map((text: any) => ({
                        id: text.id,
                        title: text.title,
                        image: getImageByTitle(text.title),
                        text: text.text
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
        <div id='services' className="flex flex-col items-center justify-center">
            <h1 className="text-center font-montserrat text-4xl font-semibold text-white mb-8 max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                Услуги
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-20 mx-10 mb-10 cursor-pointer max-lg:gap-10">
                {servicesList.map((service, index) => (
                    <div key={index}
                         className="relative overflow-hidden rounded-lg border-2 border-main-yellow hover:ring-2 hover:ring-main-yellow animation-hover"
                         onClick={() => openModal(service)}>
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-auto object-cover max-sm:h-[90%]"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-main-background bg-opacity-80 p-4">
                            <p className="text-white text-center font-montserrat font-semibold text-xl max-xl:text-base ">
                                {service.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <img src={ServicesSection} alt="service"/>
            {isModalOpen && (
                <AboutServices closeModal={closeModal} selectedService={selectedService} />
            )}
        </div>
    );
}

export default Services;
