import DocCard from "@/components/DocCard";
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
                setDocs((res.data.docs).reverse());
            } catch (err) {
                console.log(err);
                alert("Error loading docs: ", err);
            }
        }
        fetchUser();
        fetchDocs();
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            {docs.map((doc) => (
                <DocCard id={doc.docId} name={doc.name} key={doc.docId} />
            ))}
        </div>
    );
}

export default AllDocs;