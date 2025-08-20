
const Home = async () => {
  // const response = await fetch("http://localhost:3000/api/books")
  // const books = await response.json()

  const resp2 = await fetch("http://localhost:3000/api/books", {
    method: "POST",
    body: JSON.stringify({
      name: "The Alchemist"
  })
  })
  const books2 = await resp2.json()
  console.log(books2);
  
  return (
    <div>
      <h1>Home</h1>
      {/* {books2.map(book => (
        <div key={book.id}>
          <h2>{book.name}</h2>
        </div>
      ))} */}
    </div>

  )
}

export default Home