"use client";

import Sidebar from "@/app/components/sidebar/page";
import React, { useState, useEffect } from "react";
import Header from "../components/header/page";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Filmes() {
  const [defaultGenres, setDefaultGenres] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#d1d5db",
      marginTop: "4px",
      width: "100%",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.375rem",
      border: "none",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e5e7eb",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#374151",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#9ca3af",
      ":hover": {
        backgroundColor: "#f3f4f6",
        color: "#111827",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      year: "",
      release: "",
      genreId: [],
      director: "",
    },
  });

  async function getAllMovies() {
    setShowLoading(false);
    const response = await fetch("api/movies");

    const data = await response.json();
    setMovies(data);
  }

  async function getGenres() {
    const response = await fetch("api/genres");

    const data = await response.json();
    const genres = data.map((gender) => {
      return {
        value: gender.id,
        label: gender.name,
      };
    });
    setGenres(genres);
  }

  function handlePopulateMovies() {
    setShowLoading(true);
    fetch("/api/populate", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => getAllMovies())
      .catch((error) => console.error("Erro:", error));
  }

  function onSubmit(data) {
    const { genre_name, ...preparedData } = data;
    if (movie) {
      fetch("/api/movies", {
        method: "PUT",
        body: JSON.stringify(preparedData),
      })
        .then((response) => response.json())
        .then((data) => {
          getAllMovies();
          setShowForm(false);
          setMovie(null);
          resetInputs();
        })
        .catch((error) => console.error("Erro:", error));
    } else {
      fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(preparedData),
      })
        .then((response) => response.json())
        .then((data) => {
          getAllMovies();
          setShowForm(false);
          resetInputs();
        })
        .catch((error) => console.error("Erro:", error));
    }
  }
  function handleGenreChange(selectedOptions) {
    setValue("genreId", selectedOptions.map(option => option.value));
  };

  function handleDelete(movieId) {
    Swal.fire({
      title: "Deseja continuar?",
      text: "Essa ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Não, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/api/movies", {
          method: "DELETE",
          body: JSON.stringify({ id: movieId }),
        })
          .then((response) => response.json())
          .then((data) => getAllMovies())
          .catch((error) => console.error("Erro:", error));
        Swal.fire({
          title: "Deletado!",
          text: "Registro deletado com sucesso.",
          icon: "success",
        });
      }
    });
  }

  function handleEdit(movieId) {
    getGenres();
    const movieEdit = movies.find((movie) => movie.id === movieId);
    const defaultGenres = movieEdit.genre_movies?.map((genre) => ({
      value: genre.id,
      label: genre.name,
    }));

    setDefaultGenres(defaultGenres);
    setMovie(movieEdit);
    reset(movieEdit);

    setShowForm(true);
  }

  function resetInputs() {
    reset({
      title: "",
      year: "",
      release: "",
      genreId: [],
      director: "",
    });
  }

  useEffect(() => {
    getAllMovies();
    getGenres();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header
          title={!showForm ? "Filmes" : (movie ? "Editando Filme" : "Cadastrando Filme")}
          onClickAddButton={() => {
            setDefaultGenres(null);
            setShowForm(true);
            setMovie(null);
            resetInputs();
            getGenres();
          }}
          onClickPopulateButton={handlePopulateMovies}
          populateButtonLabel="Buscar Filmes"
          addButtonLabel="Adicionar"
          showLoading={showLoading}
          showButton={!showForm}
        />
        <div>
          {!showForm ? (
            <div className="relative h-[35rem] overflow-x-auto shadow-md sm:rounded-lg">
              <MovieTable />
            </div>
          ) : (
            <MovieForm />
          )}
        </div>
      </div>
    </>
  );

  function MovieTable() {
    return (
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs sticky top-0 uppercase bg-gray-700 text-gray-400">
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
              <td colSpan="6" className="text-center text-md py-4">
                Nenhum filme encontrado
              </td>
            </tr>
          ) : (
            movies.map((movie, index) => (
              <tr
                className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
                key={index}
              >
                <th className="px-6 py-4">{movie.title}</th>
                <td className="px-6 py-4">{movie.year}</td>
                <td className="px-6 py-4">{movie.release}</td>
                <td className="px-6 py-4">{movie.genre_name}</td>
                <td className="px-6 py-4">{movie.director}</td>
                <td className="flex py-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(movie.id)}
                    className="text-gray-300 ml-5 w-8 h-7 bg-indigo-800 hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-lg py-2.5 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(movie.id)}
                    className="text-gray-300 mx-5 w-8 h-7 bg-pink-800	hover:bg-pink-900 focus:outline-none font-medium rounded-lg text-lg py-2.5 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12 gap-4 mt-5">
          <div className="xl:col-span-12">
            <label
              htmlFor="title"
              className="font-medium text-md text-gray-800"
            >
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              {...register("title")}
              className="bg-gray-300 p-2 mt-1 w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
          <div className="xl:col-span-4">
            <label htmlFor="year" className="font-medium text-md text-gray-800">
              Ano
            </label>
            <input
              type="number"
              name="year"
              id="year"
              required
              {...register("year")}
              className="bg-gray-300 p-2 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
          <div className="xl:col-span-8">
            <label
              htmlFor="release"
              className="font-medium text-md text-gray-800"
            >
              Lançamento
            </label>
            <input
              type="text"
              name="release"
              id="release"
              required
              {...register("release")}
              className="bg-gray-300 p-2 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
          <div className="xl:col-span-7">
            <label
              htmlFor="genre"
              className="font-medium text-md text-gray-800"
            >
              Gênero
            </label>
            <Select
              {...register("genreId")}
              defaultValue={defaultGenres}
              placeholder="Selecione..."
              styles={customStyles}
              closeMenuOnSelect={false}
              isMulti
              options={genres}
              onChange={handleGenreChange}
              required
            />
          </div>
          <div className="xl:col-span-5">
            <label
              htmlFor="genre"
              className="font-medium text-md text-gray-800"
            >
              Diretor
            </label>
            <input
              type="text"
              name="director"
              id="director"
              required
              {...register("director")}
              className="bg-gray-300 p-2 mt-1 block w-full shadow-lg sm:text-sm rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-300 bg-pink-800 hover:bg-pink-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Cancelar
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="text-gray-300 bg-indigo-800 hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ml-3"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }
}
