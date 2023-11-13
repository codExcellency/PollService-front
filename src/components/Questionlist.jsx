import { useEffect, useState } from "react";

export default function QuestionList() {

    const [questions, setQuestions] = useState([]);
    const [poll, setPoll] = useState({ name: '', description: '' });
    const [currentQuestion, setCurrentQuestion] = useState(0);

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

    const handleNext = () => {
        setCurrentQuestion(previousIndex => previousIndex + 1);

    }

    return (

        <div>
            <h1>{poll.name}</h1>
            <h4>{poll.description}</h4>
            {questions.length > 0 && (
                <div>
                    <p>{questions[currentQuestion].content}</p>
                    <input type="text" placeholder="Answer" /><br />
                    {currentQuestion < questions.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : <p>Test</p>}
                </div>
            )}
        </div>
    )
}