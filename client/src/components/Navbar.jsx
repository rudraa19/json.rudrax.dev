import { Link } from "react-router-dom"
import { Button } from "./ui/button.jsx"

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full px-4 py-2 border-b bg-white z-10">
            <div className="flex justify-between items-center mx-4">
                <Link to="/" className="font-bold text-2xl">
                    <span className="text-[28px]">{`{` + "JSON" + `}`}</span>.rudrax.dev
                </Link>
                <div className="flex gap-2">
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
                </div>
            </div>
        </div>
    );
}

export default Navbar;
