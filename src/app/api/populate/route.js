"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        for (let index = 0; index < 10; index++) {
            const imdbId = 1190634 - index;
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=96c59f37&i=tt${imdbId}`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            const movieData = {
                title: data.Title,
                year: data.Year,
                release: data.Released,
                genre: data.Genre,
                director: data.Director,
            };

            const movies = await prisma.movies.create({
                data: movieData
            })
        }

        return new Response(JSON.stringify({ message: 'Registros criados com sucesso' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro ao criar registros:', error);
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

