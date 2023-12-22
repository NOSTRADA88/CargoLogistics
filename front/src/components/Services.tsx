import { Customs, Forwarding, Road, Sea, ServicesSection } from "../assets";


const Services = () => {
    const servicesList = [
        {
            id: 1,
            title: 'ЭКСПЕДИРОВАНИЕ',
            image: Forwarding
        },
        {
            id: 2,
            title: 'АВТОПЕРЕВОЗКИ',
            image: Road
        },
        {
            id: 3,
            title: 'МОРСКОЙ ФРАХТ',
            image: Sea
        },

        {
            id: 5,
            title: 'ТАМОЖЕННОЕ ОФОРМЛЕНИЕ',
            image: Customs
        },
        
    ];
    return (
        <div id='services'className="flex flex-col items-center  justify-center" >
            <h1 className="text-center font-montserrat text-4xl font-semibold text-white mb-8  max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                Услуги
            </h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 
            gap-8 mx-10 mb-10 cursor-pointer">
                {servicesList.map((service, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg border-2 border-main-yellow">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-main-background bg-opacity-80 p-4">
                            <p className="text-white text-center font-montserrat font-semibold text-xl  ">
                                {service.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <img src={ServicesSection} alt="service" />
        </div>
    )
}

export default Services