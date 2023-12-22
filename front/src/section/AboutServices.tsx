type AboutServicesProps = {
    closeModal: () => void;
    selectedService: {
        id: number;
        title: string;
        image: string;
        text: string;
    } | null;
};
const AboutServices = ({ closeModal, selectedService }: AboutServicesProps) => {
    return (
        <div className="fixed w-full h-full inset-0 z-50 overflow-hidden animated fadeInPrivacy faster flex items-center justify-center "
            style={{ background: "rgba(0,0,0,.7)" }}>
            <div className="max-w-md  xl:max-w-5xl lg:max-w-5xl md:max-w-2xl mx-5 bg-bg-main  max-h-screen shadow-lg flex-row rounded relative">
                <div className="py-4 text-left px-6">
                    <div className="flex justify-end items-center pb-3">
                        <div className="cursor-pointer z-50 font-bold text-md text-white  " onClick={closeModal}>
                            ✕
                        </div>
                    </div>

                    {selectedService && (
                        <div className=" pb-14">
                     
                            <h2 className="text-main-yellow text-center font-montserrat font-semibold text-2xl mt-5 leading-normal mb-5
                         max-lg:text-xl max-sm:text-base">{selectedService.title}</h2>
                            <div className="max-h-[500px] overflow-y-auto ">
                                <div className="text-block mr-5">
                                    <p dangerouslySetInnerHTML={{ __html: selectedService.text || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: selectedService.text || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: selectedService.text || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: selectedService.text || '' }} />
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>

    );
};

export default AboutServices