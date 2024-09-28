"use client";

import Sidebar from "@/app/components/sidebar/page";
import Header from "../components/header/page";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

export default function Filmes() {
  const [showForm, setShowForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      year: "",
      release: "",
      genre: "",
      director: "",
    },
  });

  async function getAllMovies() {
    const response = await fetch("api/movies");

    const data = await response.json();
    setMovies(data);
  }

  function handlePopulateMovies() {
    fetch("/api/populate", {
      method: "POST",
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro:', error));
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header
          title={!showForm ? "Filmes" : "Cadastrando Filme"}
          addButtonLabel="Adicionar"
          showButton={!showForm}
          onClickPopulateButton={handlePopulateMovies}
          populateButtonLabel="Buscar Filmes"
          onClickAddButton={() => setShowForm(true)}
        />
        <div>
          {!showForm ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <TableForm />
            </div>
          ) : (
            <MovieForm />
          )}
        </div>
      </div>
    </>
  );

  function TableForm() {
    return (
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
              Lançamento
            </th>
            <th scope="col" className="px-6 py-3">
              Gênero
            </th>
            <th scope="col" className="px-6 py-3">
              Diretor
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.length == 0 ? (
            <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
              <td colSpan="6" className="text-center py-4">
                Nenhum filme encontrado
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                <th className="px-6 py-4">{movie.title}</th>
                <td className="px-6 py-4">{movie.year}</td>
                <td className="px-6 py-4">{movie.release}</td>
                <td className="px-6 py-4">{movie.genre}</td>
                <td className="px-6 py-4">{movie.director}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }

  function MovieForm() {
    return (
      <form>
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
          <div>
            <label htmlFor="title" className="font-medium text-gray-700">
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
          <div>
            <label htmlFor="year" className="font-medium text-gray-700">
              Ano
            </label>
            <input
              type="text"
              name="year"
              id="year"
              {...register("year")}
              className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="release" className="font-medium text-gray-700">
              Lançamento
            </label>
            <input
              type="text"
              name="release"
              id="release"
              {...register("release")}
              className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="genre" className="font-medium text-gray-700">
              Gênero
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              {...register("genre")}
              className="bg-gray-300 p-1.5 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
        </div>
          <div className="flex justify-end mt-5">
            <div>
              <button
                onClick={() => setShowForm(false)}
               className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Cancelar</button>
            </div>
            <div>
              <button className="text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ml-5">Salvar</button>
            </div>
          </div>
      </form>
    );
  }
}
