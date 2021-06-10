import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const Ingredient = ({
    ingredient,
    index,
    removeIngredient,
    handleChange,
    removeItem,
}) => {
    return (
        <Container className="border p-3 mt-3 d-flex flex-column">
            <Form.Group className="ingredient">
                <Form.Label>Ingredient</Form.Label>
                <Form.Control
                    name="name"
                    type="text"
                    value={ingredient.name}
                    onChange={e => handleChange(e, index)}
                />
            </Form.Group>
            <Form.Group className="mt-3 ingredient">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    name="quantity"
                    type="text"
                    value={ingredient.quantity}
                    onChange={e => handleChange(e, index)}
                />
            </Form.Group>
            <Button
                name="ingredients"
                className="mt-3 align-self-end"
                variant="outline-secondary"
                onClick={e => removeItem(e, index)}
            >
                Remove
            </Button>
        </Container>
    );
};

export default Ingredient;
