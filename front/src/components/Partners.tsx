import { Partner1, Partner2, Partner3, Partner4, Partner5, Partner6, Partner7, Partner8 } from "../assets";

const Partners = () => {
    const partners = [
        { id: 1, partnerImage: Partner1},
        { id: 2, partnerImage: Partner2},
        { id: 3, partnerImage: Partner3},
        { id: 4, partnerImage: Partner4},
        { id: 5, partnerImage: Partner5},
        { id: 6, partnerImage: Partner6},
        { id: 7, partnerImage: Partner7},
        { id: 8, partnerImage: Partner8},
    ];
    return (
        <div className="flex flex-col items-center  justify-center pb-20 " >
            <h1 className="text-center font-montserrat text-4xl font-semibold text-white mb-8  max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                Нам доверяют
            </h1>
            <div className="w-full bg-white grid grid-cols-8 items-center gap-2
             max-2xl:grid-cols-4 max-2xl:pb-10 max-md:grid-cols-2 max-2xl:px-14 max-md:py-10 max-md:px-10
           " >
                {partners.map((partner) => (
                    <div className=" flex items-center justify-center max-md:pb-8"> 
                    <img
                        key={partner.id}
                        src={partner.partnerImage}
                        alt="partner"
                        className="object-cover"
                    />
                        </div>
                ))}
            </div>

        </div>
    )
}

export default Partners