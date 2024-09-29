"use client";

import Sidebar from "@/app/components/sidebar/page";
import React, { useState, useEffect } from "react";
import Header from "../components/header/page";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Genres() {
  const [showLoading, setShowLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [genres, setGenres] = useState([]);
  const [gender, setGender] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  async function getAllGenres() {
    setShowLoading(false);
    const response = await fetch("api/genres");
    
    const data = await response.json();
    setGenres(data);
  }

  function onSubmit(data) {
    if (gender) {
      fetch("/api/genres", {
        method: "PUT",
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          getAllGenres();
          setShowForm(false);
          setGender(null);
          resetInputs();
        })
        .catch(error => console.error('Erro:', error));
    } else {
      fetch("/api/genres", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          getAllGenres();
          setShowForm(false);
          resetInputs();
        })
        .catch(error => console.error('Erro:', error));
    }
  }

  function handleDelete(genderId) {
    Swal.fire({
      name: "Deseja continuar?",
      text: "Essa ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Não, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/api/genres", {
          method: "DELETE",
          body: JSON.stringify({ id: genderId }),
        })
          .then(response => response.json())
          .then(data => getAllGenres())
          .catch(error => console.error('Erro:', error));
        Swal.fire({
          name: "Deletado!",
          text: "Registro deletado com sucesso.",
          icon: "success"
        });
      }
    });
  }

  function handleEdit(genderId) {
    const genderEdit = genres.find(gender => gender.id === genderId);
    setGender(genderEdit);
    reset(genderEdit);

    setShowForm(true);
  }

  function resetInputs() {
    reset({
      name: ""
    });
  }

  useEffect(() => {
    getAllGenres();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Header
          title={!showForm ? "Gêneros" : "Cadastrando Gênero"}
          onClickAddButton={() => {
            setGender(null)
            setShowForm(true)
            resetInputs()
          }}
          addButtonLabel="Adicionar"
          showLoading={showLoading}
          showButton={!showForm}
        />
        <div>
          {!showForm ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <GenderTable />
            </div>
          ) : (
            <GenderForm />
          )}
        </div>
      </div>
    </>
  );

  function GenderTable() {
    return (
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {genres.length == 0 ? (
            <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
              <td colSpan="6" className="text-center py-4">
                Nenhum filme encontrado
              </td>
            </tr>
          ) : (
            genres.map((gender, index) => (
              <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={index}>
                <th className="px-6 py-4">{gender.id}</th>
                <td className="px-6 py-4">{gender.name}</td>
                <td className="flex py-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(gender.id)}
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
                    onClick={() => handleDelete(gender.id)}
                    className="text-gray-300 ml-5 w-8 h-7 bg-pink-800	hover:bg-pink-900 focus:outline-none font-medium rounded-lg text-lg py-2.5 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

  function GenderForm() {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12 gap-4 mt-5">
          <div className="xl:col-span-12">
            <label htmlFor="name" className="font-medium text-md text-gray-800">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              {...register("name")}
              className="bg-gray-300 p-1.5 mt-1 w-full border border-gray-300 shadow-lg sm:text-sm rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div>
            <button
              onClick={() => setShowForm(false)}
              className="text-white bg-pink-800 hover:bg-pink-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Cancelar</button>
          </div>
          <div>
            <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ml-3">Salvar</button>
          </div>
        </div>
      </form>
    );
  }
}
