import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allMovies = await prisma.movies.findMany({
      include: {
        GenresMovies: {
          include: {
            genre: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const newMovies = allMovies.map((movie) => {
      const genreMovies = movie.GenresMovies.map((genreMovie) => ({
        id: genreMovie.genre.id,
        name: genreMovie.genre.name,
      }));

      const movieWithGenres = {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        release: movie.release,
        director: movie.director,
        genre_name: genreMovies.map((genre) => genre.name).join(", "),
        genre_movies: genreMovies,
      };

      return movieWithGenres;
    });

    return new Response(JSON.stringify(newMovies), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const params = await req.json();

    const { genreId, ...movieData } = params;

    const movie = await prisma.movies.create({
      data: movieData,
    });

    genreId.map(async (genderId) => {
      await prisma.genresMovies.create({
        data: {
          genreId: genderId,
          movieId: movie.id,
        },
      });
    });

    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const params = await req.json();

    const {
      genreId,
      id: movie_id,
      genre_name,
      genre_movies,
      ...movieData
    } = params;

    if(genreId) {
      await prisma.genresMovies.deleteMany({
        where: {
          movieId: movie_id,
        },
      });
  
      for (const genderId of genreId) {
        await prisma.genresMovies.create({
          data: {
            genreId: genderId,
            movieId: movie_id,
          },
        });
      }
    }

    const updateMovie = await prisma.movies.update({
      where: {
        id: movie_id,
      },
      data: movieData,
    });

    return new Response(JSON.stringify({ updateMovie }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
  try {
    const params = await req.json();

    const movieId = params.id;

    await prisma.movies.delete({
      where: {
        id: movieId,
      },
    });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
