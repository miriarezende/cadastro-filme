import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allMovies = await prisma.movies.findMany({
      include: {
        genre: {
          select: {
            name: true,
          },
        },
      },
    });

    const newMovies = allMovies.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      release: movie.release,
      genreId: movie.genreId,
      director: movie.director,
      genre_name: movie.genre?.name
    }));

    return new Response(JSON.stringify(newMovies), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const params = await req.json();

    const movieData = {
      ...params,
      genreId: parseInt(params.genreId, 10)
    };

    const movie = await prisma.movies.create({
      data: movieData
    })

    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },

    });
  }
}

export async function PUT(req) {
  try {
    const params = await req.json();

    const movieData = {
      ...params,
      genreId: parseInt(params.genreId, 10)
    };

    const { id: movieId, ...dataToUpdate } = movieData;

    const updateUser = await prisma.movies.update({
      where: {
        id: movieId,
      },
      data: dataToUpdate
    })
    return new Response(JSON.stringify({ updateUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
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
    })

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
