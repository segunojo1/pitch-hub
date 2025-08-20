import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '../../auth'

const Navbar = async () => {
  const session = await auth();
  
  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
           <p>Pitch Hub</p>
        </Link> 

        <div className='flex items-center gap-4'>
          {
            session && session?.user ? (
              <>
              <Link className='bg-black' href='/satrtup/create'>
              <span>Create</span>
              </Link>

              <form action={async () => {
                  "use server";

                  await signOut();
                }}>
                <button type='submit' className='bg-black'>Logout</button>
              </form>

              <Link href={`/user${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
              </>
            ) : (
              <form action={async () => {
                "use server";

                await signIn( "github" );
              }}>
                <button type='submit'>Login with GitHub</button>
              </form>
            )
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar