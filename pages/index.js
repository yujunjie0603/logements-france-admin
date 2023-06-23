import Layout from "@/components/layout";
import { useSession } from "next-auth/react";


function Home() {

    const {data: session} = useSession();

    if (!session) return "";
    return (
        <Layout > 
            <div className="text-blue-600 flex justify-between">

                <h2>
                    hello, {session.user.email}
                </h2>
                <div className="flex bg-gray-300 gap-1 text-black rounded-md rounded-r">
                    <img src={session?.user?.image} alt="" className="w-6 h-6"/>
                    {session?.user?.name}
                </div> 
            </div>
        </Layout>
    )
}
export default Home