import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import './LoginScreen.css';

const LoginScreen = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const config={
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            }

            setLoading(true);

            const fetchData = async() => {
                await fetch('/api/users/login', config)
                .then(res => res.json())
                .then(data => {
                    // Who knows what he was doing with putting the entire data object into the storage, but I put ID for now
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    console.log(JSON.stringify(data));
                })
            }

            fetchData();
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
            setLoading(false);
        }
    };

    return (

        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-4">
                    <Col>
                        <Link to="/register">Register New Account</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    ) 
}

export default LoginScreen;