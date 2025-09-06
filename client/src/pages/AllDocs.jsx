import DocCared from "@/components/DocCard";
import { client } from "../../config";
import { useEffect, useState } from "react";
import { useToken } from "@/utils/useToken";

const AllDocs = () => {

    const token = useToken();
    const [loggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await client.get("/v1/user/", {
                    headers: { token }
                });
                if (res.data.isLoggedIn === true) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.log(err);
                alert("Error fetching user data");
                window.location.href = "/login";
            }
        }
        fetchUser();
    }, [])

    return (
        <div>
            <DocCared />
        </div>);
}

export default AllDocs;