import DocCard from "@/components/DocCard";
import { client } from "../../config";
import { useEffect, useState } from "react";
import { useToken } from "@/utils/useToken";
import { Link } from "react-router-dom";

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
            {docs.length > 0 ? docs.map((doc) => (
                <DocCard id={doc.docId} name={doc.name} key={doc.docId} />
            )) : <p>You don’t have any documents yet. <Link to="/new" className="font-bold underline">Create a new document</Link> to get started.</p>}
        </div>
    );
}

export default AllDocs;