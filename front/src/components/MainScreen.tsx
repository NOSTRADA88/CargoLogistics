import { MainBanner } from "../assets"

const MainScreen = () => {
    return (
        <div className="bg-main-dark w-full " >
            <div className="flex max-xl:flex-col justify-center">
                <div className="flex flex-col justify-center items-center w-1/2 max-2xl:w-full max-2xl:mt-10 ">
                    <h1 className=" uppercase text-white text-center font-montserrat font-semibold text-3xl leading-normal mb-5
                    max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                        Транспортные и <span className="text-main-yellow"> таможенные </span> <br />
                        услуги <span className="text-main-yellow"> высочайшего </span> уровня
                    </h1>
                    <p className="text-white text-center font-montserrat font-semibold text-2xl leading-tight mb-10 
                     max-2xl:text-xl max-lg:text-lg max-sm:text-sm" >Сосредоточьтесь на вашем бизнесе</p>
                    <button className="text-white font-montserrat text-sm font-normal rounded-md border border-solid border-yellow-400 py-2 px-10
                    max-2xl:mb-10  max-sm:text-xs">
                        Оформить заявку на расчет
                    </button>
                </div>
                <img src={MainBanner} alt='main-banner' className="max-2xl:h-[600px]  max-2xl:object-cover max-md:h-[300px]" />
            </div>
        </div>
    )
}

export default MainScreen