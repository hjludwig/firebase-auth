import React, { useRef } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import app, { db } from "../firebase/config";
import firebase from "firebase";

const AddItem = () => {
    const inputRef = useRef();
    const { currentUser } = useAuth();

    console.log(currentUser.displayName);
    const handleSubmit = e => {
        e.preventDefault();
        const userDB = db.collection("users").doc(currentUser.displayName);
        userDB.update({
            items: app.firebase_.firestore.FieldValue.arrayUnion(
                inputRef.current.value
            ),
        });
        inputRef.current.value = "";
    };

    return (
        <div>
            <h2 className="mt-3">Add item</h2>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <FormControl type="text" ref={inputRef} />
                    <InputGroup.Append>
                        <Button primary type="submit">
                            Submit
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    );
};

export default AddItem;
