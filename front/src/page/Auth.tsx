import { FormEvent, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UseAuth from "../hooks/UseAuth";
import { useForm } from "react-hook-form";

const Auth = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const { setAuth } = UseAuth();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_VAR_AUTH_URL}/authentication`, {
                login: login,
                password: password
            });
            if (response.status === 200) {
                const response_bearer = await axios.get(`${process.env.REACT_APP_VAR_AUTH_URL}/authorization`, {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                });
                if (response_bearer.data.authorized) {
                    setAuth(true);
                    navigate('/admin', { replace: true });
                }
            }
        } catch (error) {
            console.error('В запросе произошла ошибка:', error);
        }
    };

    return (
        <div>
            <form className="bg-bg-main flex justify-center items-center h-screen">
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-3xl mb-4  font-montserrat leading-normal font-bold text-white"> Авторизация</h1>
                    <div className="mb-4">
                        <label className="block text-dark-blue">
                            <span
                                className="font-montserrat font-normal  text-3xl leading-none text-white"> Логин </span>
                        </label>
                        <input type="text" id="username"
                               className="w-full border border-gray-300
                            rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"
                               value={login}
                               onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark-blue">
                            <span
                                className="font-montserrat font-normal  text-3xl leading-none text-white"> Пароль </span>
                        </label>
                        <input type="password" id="password"
                               className="w-full border
                            border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-main-yellow rounded-md py-3 px-6 cursor-pointer
                        text-black font-montserrat text-base font-semibold  max-sm:text-sm"
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Auth;
