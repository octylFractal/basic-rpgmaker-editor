import React, {useState} from "react";
import {RawInput} from "./RawInput";
import {compressToBase64, decompressFromBase64} from "lz-string";
import {Err, Ok, Result} from "../util/types";
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from "@codemirror/lang-json";
import {oneDark} from "@codemirror/theme-one-dark";
import {Block, Button, Form, Level} from "react-bulma-components";

export const SaveEditor: React.FC = () => {
    const [content, setContent] = useState<string | undefined>(undefined);
    const [output, setOutput] = useState<string | undefined>(undefined);

    if (typeof output !== "undefined") {
        return <div className="is-flex is-flex-direction-column is-align-items-center">
            <Level style={{width: "100%"}}>
                <Level.Item>
                    <Button color="danger" onClick={(): void => {
                        setOutput(undefined);
                        setContent(undefined);
                    }}>Reset</Button>
                </Level.Item>
                <Level.Item>
                    <Button color="warning" onClick={(): void => {
                        setOutput(undefined);
                    }}>Wait, go back!</Button>
                </Level.Item>
                <Level.Item>
                    <Button color="success" onClick={(): void => {
                        navigator.clipboard.writeText(output)
                            .catch(e => alert(e));
                    }}>Copy this!</Button>
                </Level.Item>
            </Level>
            <Block/>
            <Form.Textarea
                size="small"
                contentEditable={false}
                value={output}
            />
        </div>;
    }


    if (typeof content === "undefined") {
        return <div className="is-flex is-flex-direction-column is-align-items-center">
            <div style={{width: "30vw"}}>
                <RawInput onContentSubmitted={(rawContent): void => {
                    const result = decode(rawContent);
                    if (result.type === "ok") {
                        setContent(result.value);
                    } else {
                        alert(result.value);
                    }
                }}/>
            </div>
        </div>;
    }

    return <div className="is-flex is-flex-direction-column is-align-items-center">
        <Button onClick={(): void => {
            try {
                JSON.parse(content);
            } catch (e) {
                alert("Invalid JSON, aborting.");
                return;
            }
            const encoded = compressToBase64(content);
            setOutput(encoded);
        }}>All done!</Button>
        <Block/>
        <div style={{width: "100%"}}>
            <ReactCodeMirror
                height="75vh"
                value={content}
                extensions={[json()]}
                theme={oneDark}
                onChange={(newValue: string): void => {
                    setContent(newValue);
                }}
            />
        </div>
    </div>;
};

function decode(rawContent: string): Result<string, string> {
    const decompressFromBase = decompressFromBase64(rawContent);
    if (decompressFromBase === null) {
        return Err("Could not decompress from base64");
    }
    try {
        return Ok(JSON.stringify(JSON.parse(decompressFromBase), null, 4));
    } catch (e) {
        return Err("Could not beautify JSON: " + (e as Error).message);
    }
}
