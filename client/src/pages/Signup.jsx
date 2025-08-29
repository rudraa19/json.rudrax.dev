import SignupForm from "@/components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <>
            <Link to="/" className="absolute hover:underline m-5">{`<- Back`}</Link>
            <div className="flex items-center justify-center min-h-screen">
                <SignupForm />
            </div>
        </>
    );
}

export default Signup;
