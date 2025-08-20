import books from "../db";

export async function GET() {
    return Response.json(books)
}

export async function POST(request: Request) {
    const { name } = await request.json();
    const newBook = {
        id: books.length + 1,
        name: name
    };
    books.push(newBook);
    return Response.json(books);
}