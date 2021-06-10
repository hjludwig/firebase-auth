import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { UserDataProvider } from "../contexts/UserDataContext";
import AddRecipe from "./add-recipe/AddRecipe";

function App() {
    return (
        <AuthProvider>
            <UserDataProvider>
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "800px" }}>
                        <Router>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path="/add-recipe"
                                    component={AddRecipe}
                                />
                                <Route exact path="/login" component={Login} />

                                <Route
                                    exact
                                    path="/signup"
                                    component={Signup}
                                />
                            </Switch>
                        </Router>
                    </div>
                </Container>
            </UserDataProvider>
        </AuthProvider>
    );
}

export default App;
