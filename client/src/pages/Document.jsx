import { useState } from "react";
import { Button } from "../components/ui/button";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

ace.config.setModuleUrl(
    "ace/mode/json_worker",
    new URL("ace-builds/src-noconflict/worker-json.js", import.meta.url).href
);

const Document = () => {
    const [jsonData, setJsonData] = useState("{\n  \n}");

    const handleSave = async () => {
        try {
            const parsed = JSON.parse(jsonData);
            console.log("Saved JSON:", parsed);
        } catch (e) {
            alert("Invalid JSON: " + e.message);
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            <AceEditor
                mode="json"
                theme="github"
                name="json-editor"
                value={jsonData}
                onChange={setJsonData}
                width="100%"
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
            <Button onClick={handleSave} className="self-start">
                Save
            </Button>
        </div>
    );
};

export default Document;
