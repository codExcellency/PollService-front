import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export default function QuestionList() {

    const [questions, setQuestions] = useState([]);
    const [poll, setPoll] = useState({ name: '', description: '' });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState({ content: '', question: {}});

    const URL = 'http://localhost:8080/polls/3';

    useEffect(() => { showQuestions() }, []);

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

    const saveAnswer = () => {
        fetch('http://localhost:8080/answers', {
            method: 'POST',
            headers: {'Content-type':'application/json' },
            body: JSON.stringify(answer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding answer: " + response.statusText);
        })
        .catch(err => console.log(err));
    };

    const handleNext = () => {
        setCurrentQuestion(previousIndex => previousIndex + 1);
        setAnswer({content: '', question: questions[currentQuestion]})

    }

    return (

        <div>
            <h1>{poll.name}</h1>
            <h4>{poll.description}</h4>
            {questions.length > 0 && (
                <div>
                    <p>{questions[currentQuestion].content}</p>
                    <TextField
                        margin="dense"
                        label="Answer"
                        fullWidth
                        multiline
                        rows={4}
                        maxRows={Infinity}
                        variant="standard"
                        value={answer.content}
                        onChange={e => setAnswer({...answer, content: e.target.value, question: questions[currentQuestion]})}
                    /><br />
                    {currentQuestion < questions.length - 1 ? (
                        <button onClick={() => {handleNext(); saveAnswer();}}>Next</button>
                    ) : <button onClick={() => {saveAnswer();}}>Finish</button>}
                </div>
            )}
        </div>
    )
}