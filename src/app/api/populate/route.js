"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    for (let index = 0; index < 204; index++) {
      const imdbId = 1190634 - index;

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=96c59f37&i=tt${imdbId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (!data.imdbID) {
        continue;
      }
      const genresName = data.Genre;

      let existingMovie = await prisma.movies.findUnique({
        where: { imdbId: data.imdbID },
      });

      if (!existingMovie) {
        const movieData = {
          title: data.Title,
          year: data.Year,
          release: data.Released,
          director: data.Director,
          imdbId: data.imdbID,
        };

        existingMovie = await prisma.movies.create({
          data: movieData,
        });
      }

      if (genresName.includes(",")) {
        const genresArray = genresName.split(",").map((genre) => genre.trim());

        for (const genre of genresArray) {
          let existingGenre = await prisma.genres.findUnique({
            where: { name: genre },
          });

          if (!existingGenre) {
            existingGenre = await prisma.genres.create({
              data: { name: genre },
            });
          }

          const existingRelation = await prisma.genresMovies.findUnique({
            where: {
              genreId_movieId: {
                genreId: existingGenre.id,
                movieId: existingMovie.id,
              },
            },
          });

          if (!existingRelation) {
            await prisma.genresMovies.create({
              data: {
                genreId: existingGenre.id,
                movieId: existingMovie.id,
              },
            });
          }
        }
      } else {
        let existingGenre = await prisma.genres.findUnique({
          where: { name: genresName },
        });

        if (!existingGenre) {
          existingGenre = await prisma.genres.create({
            data: { name: genresName },
          });
        }

        const existingRelation = await prisma.genresMovies.findUnique({
          where: {
            genreId_movieId: {
              genreId: existingGenre.id,
              movieId: existingMovie.id,
            },
          },
        });

        if (!existingRelation) {
          await prisma.genresMovies.create({
            data: {
              genreId: existingGenre.id,
              movieId: existingMovie.id,
            },
          });
        }
      }
    }
    return new Response(
      JSON.stringify({ message: "Registros criados com sucesso" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao criar registros:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
