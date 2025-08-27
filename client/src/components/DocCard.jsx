import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const DocCared = ({ id = "123abc", name = "Untitled" }) => {
    return (
        <>
            <Link to={id}>
                <Card className="max-w-[800px] m-1 p-3 flex-row items-center justify-between">
                    {name}
                    <Button variant="destructive">Delete</Button>
                </Card>
            </Link>
        </>
    );
}

export default DocCared;