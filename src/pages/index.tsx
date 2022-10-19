import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <Head>
        <title>SolveMc App</title>
        <meta
          name="description"
          content="App made to make ordering food easier :tf:"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="absolute top-20 text-xl md:text-3xl">
        Welcome to solve<span className="text-yellow-500">M</span>c App
      </h1>
      <div>
        <h2 className="text-center text-lg font-bold text-yellow-500">
          Tutorial
        </h2>

        {/* <h2 className="text-center text-lg font-bold">
          {" "}
          You want Mcdonalds (You have to create the list)
        </h2>
        <ol className="list-decimal">
          <li>
            Click on <span className="underline">New order</span>
          </li>
          <li> Enter your name and Name of your order list</li>
          <li> Click on button to submit</li>
          <li>
            Done, your order has been created.
            <br /> follow next steps to add your products
          </li>
        </ol> */}
        {/* <h3 className="text-center text-lg font-bold">
          You want McDonalds
        </h3> */}
        <ol className="list-decimal">
          <li>
            Click on <span className="underline">All orders</span> on the navbar
          </li>
          <li> Select newest Order</li>
          <li> Add items that you want</li>
          <li> Click submit and you are Done</li>
        </ol>
      </div>
      {session ? (
        <>
          <h1 className="text-center text-2xl font-bold">
            Welcome {session?.user?.name}
            {session && session.user && session.user.image && (
              <Image
                src={session?.user?.image}
                alt="text"
                width={50}
                height={50}
              />
            )}
          </h1>
          <button
            className="rounded bg-yellow-500 py-2 px-4 font-bold text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          className="rounded bg-yellow-500 py-2 px-4 font-bold text-white"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </>
  );
};

export default Home;
