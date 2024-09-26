"use client";

import Sidebar from "@/app/components/sidebar/page"
import Header from "../components/header/page"
import { useForm } from "react-hook-form";

export default function Filmes() {
    

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            year: "",
            release: "",
            genre: ""
        }
    });

    async function getAllMovies() {
        console.log(1234);
      }


    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Header title="Filmes" addButtonLabel="Adicionar" />
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Título
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ano
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lancamento
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gênero
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Diretor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-bborder-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <MovieForm/>
                </div>
            </div>
        </>
    )

    function MovieForm() {
        return (
            <form>
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                    <div >
                        <label htmlFor="title"
                            className="font-medium text-gray-700">
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            {...register("title")}
                            className="bg-gray-300 p-1.5 mt-1 w-full border border-gray-300 shadow-lg sm:text-sm rounded-md"
                        />
                    </div>
                    <div >
                        <label htmlFor="year"
                            className="font-medium text-gray-700">
                            Ano
                        </label>
                        <input type="text"
                            name="year"
                            id="year"
                            {...register("year")}
                            className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
                        />
                    </div>
                    <div >
                        <label htmlFor="release"
                            className="font-medium text-gray-700">
                            Lancamento
                        </label>
                        <input type="text"
                            name="release"
                            id="release"
                            {...register("release")}
                            className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
                        />
                    </div>
                    <div >
                        <label htmlFor="genre"
                            className="font-medium text-gray-700">
                            Gênero
                        </label>
                        <input type="text"
                            name="genre"
                            id="genre"
                            {...register("genre")}
                            className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
                        />
                    </div>
                </div>
            </form>
        )
    }
}