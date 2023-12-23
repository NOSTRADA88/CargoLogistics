import { SetStateAction, useState } from "react";
import { Customs, Forwarding, Road, Sea, ServicesSection } from "../assets";
import { AboutServices } from "../section";

type Service = {
    id: number;
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
    const servicesList: Service[] = [
        {
            id: 1,
            title: 'ЭКСПЕДИРОВАНИЕ',
            image: Forwarding,
            text: '<p>Транспортная логистика и экспедирование позволяют существенно уменьшить затраты компании-заказчика на грузоперевозку при одновременном сокращении сроков поставки. Наши опытные сотрудники окажут все необходимые операции, включая грамотное консультирование, решение организационных моментов и возникающих на таможне вопросов: хранение, налоги, декларирование.</p><p>Экспедирование грузов включает в себя:</p><ul><li>Тщательное планирование маршрута.</li><li>Оформление всей необходимой документации.</li></ul><p>Заключение договора на международное экспедирование грузов – единственно верное решение, избавляющее клиента от беспокойства за свой товар. Ведь мы страхуем все потенциальные риски и берем на себя любые хлопоты, возникающие в процессе транспортировки. Заказчик же экономит свое время и деньги.</p>',
          
        },
        {
            id: 2,
            title: 'АВТОПЕРЕВОЗКИ',
            image: Road,
            text: '345'
        },
        {
            id: 3,
            title: 'МОРСКОЙ ФРАХТ',
            image: Sea,
            text: '567'
        },

        {
            id: 5,
            title: 'ТАМОЖЕННОЕ ОФОРМЛЕНИЕ',
            image: Customs,
            text: '378945'
        },

    ];
    return (
        <div id='services' className="flex flex-col items-center  justify-center" >
            <h1 className="text-center font-montserrat text-4xl font-semibold text-white mb-8  max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                Услуги
            </h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 
            gap-20 mx-10 mb-10 cursor-pointer max-lg:gap-10">
                {servicesList.map((service, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg border-2 border-main-yellow" onClick={() => openModal(service)}>
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-main-background bg-opacity-80 p-4">
                        <p className="text-white text-center font-montserrat font-semibold text-xl">
                            {service.title}
                        </p>
                    </div>
                </div>
                
                ))}
            </div>
            <img src={ServicesSection} alt="service" />
            {isModalOpen && (
                <AboutServices closeModal={closeModal} selectedService={selectedService} />
            )}
        </div>
    )
}

export default Services