import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useEffect, useState } from "react"
import { client } from "../../config.js"

const LoginForm = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isClicked, setIsClicked] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isClicked) {
            document.body.style.cursor = "wait"
        } else {
            document.body.style.cursor = "inherit"
        }
    }, [isClicked])

    async function login() {
        setIsClicked(true);
        try {
            const res = await client.post("/v1/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            navigate("/");
        } catch (err) {
            if (err.response) {
                if (err.response.status == 400) {
                    setErrMessage("All fields are required!");
                } else if (err.response.status == 404) {
                    setErrMessage("Please signup first!");
                } else if (err.response.status == 401) {
                    setErrMessage("Wrong username or Password!");
                } else {
                    setErrMessage("Something went wrong. Please try again later!");
                }
            } else {
                alert("Error during signup: " + err.message);
            }
            console.log(err.message)
        }
        setIsClicked(false);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your username below to login to your account
                </CardDescription>
                <CardAction>
                    <Link to="/signup"><Button variant="link">Sign Up</Button></Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        {errMessage && (
                            <div className="text-red-500 text-sm">{errMessage}</div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                onInput={e => setUsername(e.target.value)}
                                placeholder="user123"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {/* <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a> */}
                            </div>
                            <Input id="password" type="password" onInput={e => setPassword(e.target.value)} required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" style={{ opacity: isClicked ? 0.5 : 1 }} onClick={() => login()}>
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LoginForm;