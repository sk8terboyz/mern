import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useEffect, useState } from "react";

const MyNotes = () => {

    const [notes, setNotes] = useState([]);
    
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure?")) {
            
        }
    };

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);
      
        return (
          <button
            type="button"
            style={{ backgroundColor: 'transparent', border: "none", flex: 1, height: '100%', textAlign: 'left' }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
    }

    const fetchNotes = async() => {
        await fetch('/api/notes')
        .then(res => res.json())
        .then(data => setNotes(data))
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <MainScreen title='Welcome Back User...'>
            <Link to='createnote'>
                <Button style={{ marginLeft:10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
                {
                    notes.map(note => (
                        <Accordion key={note._id}>
                            <Accordion.Item>
                                <Card style={{ margin: 10}}>
                                    <Card.Header style={{display: 'flex'}}>
                                        <CustomToggle eventKey={note._id}>
                                            <span style={{
                                                color: "black",
                                                textDecoration: "none",
                                                cursor: "pointer",
                                                fontSize: 18,
                                            }}>
                                                <strong>{note.title}</strong>
                                            </span>
                                        </CustomToggle>
                                            <div>
                                                <Button href={`/note/${note._id}`}>Edit</Button>
                                                <Button variant='danger' className='mx-2' onClick={ () => deleteHandler(note._id)}>Delete</Button>
                                            </div>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={note._id}>
                                        <Card.Body>
                                            <h5>
                                                <Badge bg='success'>
                                                    Category - {note.category}
                                                </Badge>
                                            </h5>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {note.content}
                                                </p>
                                                <footer className="blockquote-footer">
                                                    Created On - date
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion.Item>
                        </Accordion>
                    ))
                }
        </MainScreen>
    )
}

export default MyNotes;