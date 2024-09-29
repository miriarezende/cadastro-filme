import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allGenres = await prisma.genres.findMany();

    return new Response(JSON.stringify(allGenres), {
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

    const gender = await prisma.genres.create({
      data: params
    })

    return new Response(JSON.stringify(gender), {
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

    const { id: genderId, ...dataToUpdate } = params;

    const updateGender = await prisma.genres.update({
      where: {
        id: genderId,
      },
      data: dataToUpdate
    })
    return new Response(JSON.stringify({ updateGender }), {
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

    const genderId = params.id;

    await prisma.genres.delete({
      where: {
        id: genderId,
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
