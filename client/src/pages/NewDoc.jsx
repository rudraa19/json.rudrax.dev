import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../config.js";
import { useToken } from "../utils/useToken.jsx";

const NewDoc = () => {
    const token = useToken();
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (hasRun.current) return;
        hasRun.current = true;

        async function createDoc() {
            try {
                const res = await client.post(
                    "/v1/docs/",
                    { docName: `Untitled (${new Date().toLocaleString()})` },
                    { headers: { token } }
                );
                navigate(`/docs/${res.data.docId}`);
            } catch (err) {
                console.error(err);
                alert("Error creating new bin");
                navigate("/");
            }
        }

        createDoc();
    }, [token, navigate]);

    return (
        <>
            Creating new document...
        </>
    );
};

export default NewDoc;
