import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export default function QuestionList() {

    const [questions, setQuestions] = useState([]);
    const [poll, setPoll] = useState({ name: '', description: '' });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState({ content: '', question: {} });
    const [isClicked, setIsClicked] = useState(false);
    const [isFInished, setIsFinished] = useState(false);

    const URL = 'http://localhost:8080/polls/3';


    // Show questions on page load
    useEffect(() => { showQuestions() }, []);

    // Fetch poll data from database
    const showQuestions = () => {
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                setQuestions(responseData.questions)
                setPoll(responseData)
            })
            .catch(err => console.error(err));
    }

    // Save answer to database
    // Check if answer is empty
    // If not empty, save answer to database
    const saveAnswer = () => {
        if (myRef.current.value === '') {
            return;
        } else {
            fetch('http://localhost:8080/answers', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(answer)
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when adding answer: " + response.statusText);
                })
                .catch(err => console.log(err));
        }
    };

    // Handle next button
    // Check if answer is empty
    // If not empty, go to next question
    const handleNext = () => {
        if (myRef.current.value === '') {
            alert('Please fill in the answer field!');
            return;
        } else {
            setCurrentQuestion(previousIndex => previousIndex + 1);
            setAnswer({ content: '', question: questions[currentQuestion] })
        }
    }

    return (

        <div>
            {isFInished ? (             // Show thank you message when poll is finished   
                <div>
                    <h1>Thank you for your answers!</h1>
                    <p style={{ fontSize: "24px" }} > You can close the poll now.</p>
                </div>
            ) : (
                <div>
                    {!isClicked ? (     // Show poll name and description when start button is not clicked 
                        <div>
                            <h1>{poll.name}</h1>
                            <p style={{ fontSize: "24px" }}>{poll.description}</p>
                            <button onClick={() => setIsClicked(true)}>Start</button>
                        </div>) : (     // Show questions when start button is clicked
                        <div>
                            <h1>{poll.name}</h1>
                            {questions.length > 0 && (
                                <div>
                                    <p style={{ fontSize: "24px" }}>{questions[currentQuestion].content}</p>
                                    <TextField
                                        required
                                        margin="dense"
                                        label="Answer"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        // maxRows={Infinity}
                                        variant="standard"
                                        value={answer.content}
                                        onChange={e => setAnswer({ ...answer, content: e.target.value.trimStart(), question: questions[currentQuestion] })}
                                    /><br />
                                    {currentQuestion < questions.length - 1 ? (
                                        <button onClick={() => { handleNext(); saveAnswer(); }}>Next</button>
                                    ) : <button onClick={() => { saveAnswer(); setIsFinished(true); }}>Finish</button>}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )
            }
        </div >
    )
}