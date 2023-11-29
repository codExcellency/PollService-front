import { useEffect, useState } from "react";

export default function AnswersReport() {

    const [questions, setQuestions] = useState([]);
    const [poll, setPoll] = useState({ name: '', description: '' });

    useEffect(() => { showQuestions() }, []);

    const URL = 'http://localhost:8080/polls/3';

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

    return (
        <div>
            <h1>{poll.name}</h1>
            <p style={{ fontSize: "24px" }}>{poll.description}</p>
            {questions.length > 0 && (
                <div>
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex}>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{question.content}</p>
                            {question.answers.map((answer, answerIndex) => (
                                <p key={answerIndex}>{answer.content}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}