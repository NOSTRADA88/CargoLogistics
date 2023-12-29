import { About } from "../assets"
import React, {useEffect, useState} from "react";
import axios from "axios";


const AboutCompany = () => {

    const [aboutContent, setAboutContent] = useState(``);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_VAR_API_URL}/`)
            .then(response => {
                const aboutCompany = response.data.texts.find((text: any) => text.title === "О компании");
                if (aboutCompany) {
                    setAboutContent(aboutCompany.text);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className=" w-full " >
            <div className="flex max-2xl:flex-col justify-center">
                <img src={About} alt='main-banner' className="w-1/2 max-2xl:w-full max-2xl:object-cover max-2xl:h-[600px] max-md:h-[300px]" />
                <div id='about' className="flex flex-col justify-center items-center w-1/2 max-2xl:w-full  mb-10">
                    <h1 className=" text-main-yellow text-center font-montserrat font-semibold text-3xl mt-5 leading-normal mb-5
            max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                        О компании
                    </h1>
                    <div
                        className="text-white text-justify font-montserrat text-2xl max-lg:text-xl max-sm:text-base font-normal mx-20 max-md:mx-10"
                        style={{whiteSpace: 'pre-line'}}>
                        {aboutContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCompany