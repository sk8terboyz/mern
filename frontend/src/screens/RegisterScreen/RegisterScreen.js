import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmpassword) {
            setMessage(`Passwords Do Not Match`);
        } else {
            setMessage(null);
            try {
                const config={
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        pic,
                    })
                }
    
                setLoading(true);
    
                const fetchData = async() => {
                    await fetch('/api/users/', config)
                    .then(res => res.json())
                    .then(data => {
                        // Who knows what he was doing with putting the entire data object into the storage, but I put ID for now
                        localStorage.setItem('userInfo', JSON.stringify(data));      
                    })
                }
    
                fetchData();
                setLoading(false);
            } catch (error) {
                    setError(error.response.data.message);
                    setLoading(false);
            }
        }
    };

    const postDetails = (pics) => {

        if(!pics) {
            return setPicMessage("Please Select an Image")
        }
        setPicMessage(null);

        if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'notezipper');
            data.append('cloud_name', 'sk8terboyz');
            fetch("cloudinary://363878751867345:RgDJfLdzHZFE4O6Rv4TTtPaDReA@sk8terboyz", {
                method: 'POST',
                body: data,
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPic(data.url.toString());
            }).catch((err) => {
                console.log(err);
            });
        } else {
            return setPicMessage("Please Select an Image");
        }
    }

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={confirmpassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    
                    {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
                    
                    <Form.Group className="mb-3" controlId="pic">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    
                </Form>
                <Row className="py-4">
                    <Col>
                        <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen;