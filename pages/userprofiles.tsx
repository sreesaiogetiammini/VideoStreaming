import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  const { data: curentuser } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className=" text-4xl md:text-7xl text-white text-center">
          {" "}
          Enjoy Your Binge Watch !!!
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="w-44
          h-44
          rounded-md
          flex
          items-center
          justify-center
          border-2
          border-transparent
          group-hover: cursor-pointer
          overflow-hidden
          "
              >
                <img
                  className="rounded-full h-full"
                  src="/images/man.png"
                  alt="User profile"
                ></img>
              </div>
              <div
                className="mt-4
          text-gray-400
          text-3xl
          text-center
          group-hover:text-white

          "
              >
                {curentuser?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
