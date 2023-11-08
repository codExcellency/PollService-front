import { useState, useEffect } from 'react';

export default function QuestionList() {

    const [questions, setQuestions] = useState([]);

    const URL = 'http://localhost:8080/polls/2';

    useEffect(() => { showQuestions() }, [])

    const showQuestions = () => {
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                setQuestions(responseData)
            })
            .catch(err => console.error(err))
    }



    return (
        <div>
            <h1>{questions.name}</h1>
            <h3>{questions.description}</h3>
            <h5>List of questions:</h5>
            {questions.map((question) => (
                <li key={question.questionId}>
                    <p>{question.questions}</p>

                </li>
            ))}
        </div>
    )
}