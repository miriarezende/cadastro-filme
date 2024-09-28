export async function GET(req) {
  try {
    const allMovies = await prisma.movies.findMany();

    return new Response(JSON.stringify(allMovies), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
