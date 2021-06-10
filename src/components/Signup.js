import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/config";

const Signup = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const user = useAuth().currentUser;

    const handleSubmit = async e => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match");
        }
        try {
            setError("");
            setLoading(true);
            const result = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );
            result.user.updateProfile({ displayName: nameRef.current.value });
            await db.collection("users").doc(nameRef.current.value).set({
                userName: nameRef.current.value,
                email: emailRef.current.value,
            });
            history.push("/");
        } catch {
            setError("Failed to create account");
            console.log(error);
        }
        setLoading(false);
    };
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="name"
                                required
                                ref={nameRef}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                ref={emailRef}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={passwordRef}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={passwordConfirmRef}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-100"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Log In
            </div>
        </div>
    );
};

export default Signup;
