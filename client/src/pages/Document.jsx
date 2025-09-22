import { useEffect, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-eclipse";
import { API_URL, client } from "../../config";
import { useToken } from "@/utils/useToken";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";

ace.config.setModuleUrl(
    "ace/mode/json_worker",
    new URL("ace-builds/src-noconflict/worker-json.js", import.meta.url).href
);

const Document = () => {
    const { id: docId } = useParams();
    const [jsonData, setJsonData] = useState();
    const [title, setTitle] = useState();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const token = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (isClicked) {
            document.body.style.cursor = "wait";
        } else {
            document.body.style.cursor = "inherit";
        }
    }, [isClicked])

    // Save document
    const handleSave = useCallback(async () => {
        setIsClicked(true);
        try {
            const parsed = JSON.parse(jsonData);

            await client.patch(`/v1/docs/${docId}`, {
                docName: title,
                content: JSON.stringify(parsed, null, 2),
            }, {
                headers: { token },
            });

            alert("Document saved!");
            window.location.reload();
        } catch (e) {
            alert("Invalid JSON: " + e.message);
        }
        setIsClicked(false);
    }, [jsonData, title, docId, token]);

    // Keyboard shortcut: Ctrl+S / Cmd+S
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleSave]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await client.get("/v1/user/", {
                    headers: { token }
                });
                if (res.data.isLoggedIn === true) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.log(err);
                alert("Error fetching user data");
                window.location.href = "/login";
            }
        }

        async function fetchDocument() {
            try {
                const res = await client.get(`/v1/docs/editor/${docId}`, {
                    headers: { token }
                });
                setTitle(res.data.title);
                setJsonData(res.data.content);
            } catch (err) {
                console.error(err);
                if (err.response.status == 400) {
                    navigate('/404');
                } else {
                    alert("Failed to fetch document for editor");
                }
            }
        }

        fetchUser();
        fetchDocument();
    }, []);

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            <Link className="cursor-pointer hover:underline" to="/docs">{"<-back"}</Link>
            <div className="flex items-center">
                {isEditingTitle ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setIsEditingTitle(false);
                        }}
                        autoFocus
                        className="border px-2 py-1 rounded text-lg font-semibold"
                    />
                ) : (
                    <h1
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {title} &#x270E;
                    </h1>
                )}
            </div>

            {/* JSON editor */}
            <AceEditor
                mode="json"
                theme="eclipse"
                name="json-editor"
                value={jsonData}
                onChange={setJsonData}
                width="100%"
                height="400px"
                fontSize={14}
                showPrintMargin={false}
                setOptions={{
                    useWorker: true,
                    tabSize: 2,
                    showLineNumbers: true,
                    behavioursEnabled: true,
                }}
                className="border rounded"
            />

            {/* Save button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleSave} style={{ opacity: isClicked ? 0.5 : 1 }} className="self-start">
                        Save
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ctrl + S</p>
                </TooltipContent>
            </Tooltip>

            <div>
                This doc is available at: <a className="underline font-medium" href={`${API_URL}v1/docs/${docId}`} target="_blank">{`${API_URL}v1/docs/${docId}`}</a>
            </div>
        </div>
    );
};

export default Document;
