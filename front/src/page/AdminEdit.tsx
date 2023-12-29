import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AdminEdit = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const params = useParams();
    const [aboutContentText, setAboutContentText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_VAR_API_URL}/${params.id}`);
                if (response.status === 200) {
                    setAboutContentText(response.data.text.text);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [params.id]);

    const saveForm: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const response = await axios.put(`${process.env.REACT_APP_VAR_API_URL}/${params.id}`, data);
            if (response.status === 200) {
                navigate("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-bg-main min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md mx-auto p-4 w-full">
                <h1 className="text-main-yellow text-center font-montserrat font-semibold text-3xl mt-5 leading-normal mb-5 max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
                    <span className="text-white"> Редактирование текста: </span> <br />
                </h1>
            </div>
            <form onSubmit={handleSubmit(saveForm)} className="flex-grow w-full">
                <div
                    className="text-white text-justify font-montserrat text-2xl max-lg:text-xl max-sm:text-base font-normal mx-4"
                    style={{ whiteSpace: "pre-line", paddingTop: "10px", marginBottom: "0" }}
                >
                    <textarea
                        defaultValue={aboutContentText}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline resize-none"
                        placeholder="Введите новый текст"
                        {...register("text", {
                            min: {value: 1, message: "Данный текст не может быть пустым"},
                        })}
                        rows={17}
                        cols={30}
                    />
                    {errors.text && <div className="text-red-500">{String(errors.text.message)}</div>}
                </div>

                <div className="text-center">
                    <button
                        className="bg-main-yellow rounded-md py-3 cursor-pointer text-black font-montserrat text-base font-semibold hover:bg-[#B4884F] animation-hover my-6 px-5"
                        type="submit"
                    >
                    Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEdit;
