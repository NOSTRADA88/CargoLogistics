import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminAbout = () => {
    const [aboutContentText, setAboutContentText] = useState(``);
    const [aboutContentID, setAboutContentID] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_VAR_API_URL}/`)
            .then(response => {
                const aboutCompany = response.data.texts.find((text: any) => text.title === "О компании");
                if (aboutCompany) {
                    setAboutContentText(aboutCompany.text);
                    setAboutContentID(aboutCompany.id);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div id="about" className="w-full">
            <div className="flex max-2xl:flex-col justify-center">
                <div className="flex flex-col justify-center items-center w-1/2 max-2xl:w-full  mb-10">
                    <h1 className="text-main-yellow text-center font-montserrat font-semibold text-3xl mt-5 leading-normal mb-5 max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                        <span className='text-white'> Редактирование текста: </span> <br />
                        О компании
                    </h1>
                    <div className="text-white text-justify font-montserrat text-2xl max-lg:text-xl max-sm:text-base font-normal mx-20 max-md:mx-10" style={{ whiteSpace: 'pre-line' }}>
                        {aboutContentText}
                    </div>
                    <div className="flex-grow" />
                    <Link to={`${aboutContentID}`} key={0}>
                        <button
                            className="bg-main-yellow rounded-md py-3 cursor-pointer text-black font-montserrat text-base font-semibold hover:bg-[#B4884F] animation-hover mt-6"
                        >
                            Редактировать
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminAbout;
