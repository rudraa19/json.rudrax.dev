import DocCared from "@/components/DocCard";
import { client } from "../../config";
import { useEffect, useState } from "react";
import { useToken } from "@/utils/useToken";

const AllDocs = () => {

    const token = useToken();
    const [loggedIn, setIsLoggedIn] = useState();
    const [docs, setDocs] = useState([]);

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

        async function fetchDocs() {
            try {
                const res = await client.get("/v1/docs/", {
                    headers: { token }
                })
                setDocs(res.data.docs);
            } catch (err) {
                console.log(err);
                alert("Error loading docs: ", err);
            }
        }
        fetchUser();
        fetchDocs();
    }, [])

    return (
        <div>
            {
                docs.map(id => <DocCared id={id.docId} name={id.name} key={id.docId} />)
            }
        </div>);
}

export default AllDocs;