import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="h-[80dvh] grid place-items-center px-6">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                    {"{JSON}"}.rudrax.dev
                </h1>

                <p className="text-lg text-muted-foreground max-w-xl mb-8">
                    The simplest way to store and share JSON data. Paste your JSON, get a clean API endpoint instantly. No setup, no hassle.
                </p>

                <div className="flex space-x-4">
                    <Button asChild>
                        <Link to="/new">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/docs">View Docs</Link>
                    </Button>
                </div>

                <footer className="mt-12 text-sm text-muted-foreground">
                    Built with ❤️ by <a className="font-medium underline" href="https://github.com/rudraa19/" target="_blank">Rudra</a>
                </footer>
            </div>
        </div>
    )
}

export default HomePage
