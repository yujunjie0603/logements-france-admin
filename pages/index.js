import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

function Home() {0
    const {data: session} = useSession();

    return (
        <Layout > 
            <HomeHeader />
            <HomeStats />
        </Layout>
    )
}
export default Home