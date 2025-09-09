import { Link } from "react-router-dom"
import { Button } from "./ui/button.jsx"
import { UserDropdown } from "./ui/DropDown.jsx";
import { useEffect, useState } from "react";
import { client } from "../../config.js";
import { useToken } from "@/utils/useToken.jsx";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState();
    const token = useToken();
    useEffect(() => {
        async function fetchUser() {
            const res = await client.get("/v1/user/", {
                headers: { token }
            });
            try {
                if (res.data.isLoggedIn == true) {
                    setIsLoggedIn(true);
                    setUsername(res.data.username);
                }
            } catch (err) {
                console.log(err);
                alert("Error fetching user data");
            }
        }
        fetchUser();
    }, [])

    async function newDoc() {
        try {
            const res = await client.post("/v1/docs/", {
                docName: `Untitled (${new Date().toLocaleString()})`
            }, {
                headers: { token }
            });
            window.location.href = `/docs/${res.data.docId}`;
        } catch (err) {
            console.log(err);
            alert("Error creating new bin");
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full px-4 py-2 border-b bg-white z-10">
            <div className="flex justify-between items-center mx-4">
                <Link to="/" className="font-bold text-2xl">
                    <span className="text-[28px]">{`{JSON}`}</span>.rudrax.dev
                </Link>
                <div className="flex gap-2">
                    {!isLoggedIn && (<>
                        <Button>
                            <Link to="/signup">
                                Signup
                            </Link>
                        </Button>
                        <Link to="/login">
                            <Button variant="outline">
                                Login
                            </Button>
                        </Link>
                    </>)}
                    {isLoggedIn && <>
                        <Link to="/new">
                            <Button variant="outline">+ NEW</Button>
                        </Link>
                        <UserDropdown username={username} />
                    </>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
