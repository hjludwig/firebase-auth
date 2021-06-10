import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Ingredient from "./Ingredient";
import Step from "./Step";
import { v4 as uuidv4 } from "uuid";
import app, { db } from "../../firebase/config";

const AddRecipe = () => {
    const initialState = {
        name: "",
        id: uuidv4(),
        description: "",
        ingredients: [{ name: "", quantity: "" }],
        steps: [],
    };

    const [recipe, setRecipe] = useState(initialState);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (e.target.parentElement.classList.contains("ingredient")) {
            const newIngredients = [...recipe.ingredients];
            newIngredients[index][name] = value;
            setRecipe(prevState => ({
                ...prevState,
                ingredients: newIngredients,
            }));
        } else if (e.target.parentElement.classList.contains("step")) {
            const newSteps = [...recipe.steps];
            newSteps[index] = value;
            setRecipe(prevState => ({
                ...prevState,
                steps: newSteps,
            }));
        } else {
            setRecipe(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }

        console.log(recipe);
    };
    const removeItem = (e, index) => {
        console.log(e, " ", index);
        const name = e.target.name;
        const list = [...recipe[name]];
        const newList = list.filter((item, i) => i !== index);
        setRecipe(prevState => ({ ...prevState, [name]: newList }));
    };

    const addItem = e => {
        const name = e.target.name;
        let newItem;
        if (name === "ingredients") {
            newItem = { name: "", quantity: "" };
        } else {
            newItem = "";
        }
        const newList = [...recipe[name], newItem];
        setRecipe(prevState => ({ ...prevState, [name]: newList }));
    };
    const { currentUser } = useAuth();
    const handleSubmit = e => {
        e.preventDefault();
        console.log(recipe);
        const userDB = db.collection("users").doc(currentUser.displayName);
        userDB.update({
            recipes: app.firebase_.firestore.FieldValue.arrayUnion(recipe),
        });
    };

    return (
        <Container className="py-6" style={{ padding: "60px 0" }}>
            <h1>Add recipe</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mt-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="description" className="mt-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text-area"
                        name="description"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.File id="image" label="Add an image" />
                </Form.Group>
                <div>
                    <h3 className="mt-4">Ingredients</h3>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Ingredient
                            ingredient={ingredient}
                            index={index}
                            handleChange={handleChange}
                            removeItem={removeItem}
                        />
                    ))}
                    <Button
                        name="ingredients"
                        variant="outline-secondary"
                        className="mt-3"
                        onClick={addItem}
                    >
                        Add Ingredient
                    </Button>
                </div>
                <div>
                    <h3 className="mt-4">Instructions</h3>
                    {recipe.steps.map((step, index) => (
                        <Step
                            step={step}
                            index={index}
                            handleChange={handleChange}
                            removeItem={removeItem}
                        />
                    ))}
                    <Button
                        name="steps"
                        variant="outline-secondary"
                        className="mt-3"
                        onClick={addItem}
                    >
                        Add Step
                    </Button>
                </div>
                <div className="d-grid gap-2">
                    <Button
                        className="mt-5"
                        type="submit"
                        variant="primary"
                        size="lg"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddRecipe;
