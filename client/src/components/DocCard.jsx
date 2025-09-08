import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { client } from "../../config";
import { useToken } from "@/utils/useToken";

const DocCared = ({ id = "123abc", name = "Untitled" }) => {
    const token = useToken();
    async function handleDelete(id) {
        try {
            await client.delete(`/v1/docs/${id}`, {
                headers: { token }
            });
            alert("Doc deleted successfully!");
        } catch (err) {
            alert("Error occured during deleting doc!");
            console.log(err);
        }
    }
    return (
        <>
            <Link to={id}>
                <Card className="w-[800px] m-1 p-3 flex flex-row items-center justify-between">
                    <b>{name}</b>
                    <Button variant="destructive" className="cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(id); }}>
                        Delete
                    </Button>
                </Card>
            </Link>
        </>
    );
}

export default DocCared;