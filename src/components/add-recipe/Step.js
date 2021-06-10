import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const Step = ({ index, handleInputChange, step, removeItem, handleChange }) => {
    return (
        <Container className="border p-3 mt-3">
            <Form.Group className="step">
                <Form.Label>Step {index + 1}</Form.Label>
                <Form.Control
                    value={step}
                    type="text"
                    name="steps"
                    onChange={e => handleChange(e, index)}
                />
                <Button
                    name="steps"
                    className="mt-3"
                    variant="outline-secondary"
                    onClick={e => removeItem(e, index)}
                >
                    Remove
                </Button>
            </Form.Group>
        </Container>
    );
};

export default Step;
