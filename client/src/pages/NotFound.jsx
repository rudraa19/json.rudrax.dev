import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="h-[80dvh] grid place-items-center px-6">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    404
                </h1>

                <p className="text-lg text-muted-foreground max-w-xl mb-8">
                    Oops! The page you are looking for does not exist.
                </p>

                <Button asChild>
                    <Link to="/">Go Back Home</Link>
                </Button>

            </div>
        </div>
    )
}

export default NotFound
