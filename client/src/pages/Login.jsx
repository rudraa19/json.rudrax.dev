import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <Link to="/" className="absolute hover:underline m-5">{`<- Back`}</Link>
            <div className="flex items-center justify-center min-h-screen">
                <LoginForm />
            </div>
        </>
    );
}

export default Login;
