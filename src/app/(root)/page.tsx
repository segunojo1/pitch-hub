import SearchForm from "@/components/search-form";

const Home = async ({searchParams}: {searchParams: Promise<{query: string}>}) => {
  // const response = await fetch("http://localhost:3000/api/books")
  // const books = await response.json()

  // const resp2 = await fetch("http://localhost:3000/api/books", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     name: "The Alchemist"
  // })
  // })
  // const books2 = await resp2.json()
  // console.log(books2);
  const query = (await searchParams).query;
  return (
    <div>
      <section className="pink_container">

      <h1 className="heading">Pitch your Startup, <br /> Connect With Entrepreneurs </h1>
      <p className="sub-heading !max-w-3xl">
        Submit ideas, vote on pitches and get beter visibility for your projects
      </p>
      <SearchForm query={query} />  
      </section>
      {/* {books2.map(book => (
        <div key={book.id}>
          <h2>{book.name}</h2>
        </div>
      ))} */}
    </div>

  )
}

export default Home