import ProjectCard, { StartupTypeCard } from "@/components/project-card";
import SearchForm from "@/components/search-form";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Home = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
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
  const params = { search: query || null }
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({query: STARTUPS_QUERY, params})
  console.log(JSON.stringify(posts, null, 2));
  
  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id: 1, name: "John Doe" },
  //   _id: 1,
  //   description: "descriptionnn",
  //   image: "https://placehold.co/600x400",
  //   category: "robots",
  //   title: "we robots"
  // }]
  return (
    <div>
      <section className="pink_container">

        <h1 className="heading">Pitch your Startup, <br /> Connect With Entrepreneurs </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, vote on pitches and get beter visibility for your projects
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Projects"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <ProjectCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </ul>
      </section>

      <SanityLive />
      {/* {books2.map(book => (
        <div key={book.id}>
          <h2>{book.name}</h2>
        </div>
      ))} */}
    </div>

  )
}

export default Home