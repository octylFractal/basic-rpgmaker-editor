import React, {useState} from "react";
import {Button, Form} from "react-bulma-components";

export interface RawInputProps {
    onContentSubmitted: (fileContent: string) => void;
}

export const RawInput: React.FC<RawInputProps> = ({onContentSubmitted}) => {
    const [text, setText] = useState("");

    return <form
        onSubmit={(e): void => {
            e.preventDefault();
            onContentSubmitted(text);
        }}
    >
        <Form.Field>
            <Form.Control>
                <Form.Textarea
                    size="small"
                    placeholder="Give me your raw file data!"
                    value={text}
                    onChange={(e): void => setText(e.currentTarget.value)}
                />
            </Form.Control>
        </Form.Field>
        <Form.Field kind="group" align="center">
            <Form.Control>
                <Button color="link" onClick={(e: React.MouseEvent): void => {
                    e.preventDefault();
                    navigator.clipboard.readText()
                        .then((clipboardText) => {
                            setText(clipboardText);
                        })
                        .catch(e => alert(e));
                }}>Get it from my clipboard, please!</Button>
            </Form.Control>
            <Form.Control>
                <Button color="link">Submit</Button>
            </Form.Control>
        </Form.Field>
    </form>;
};
