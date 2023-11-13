import { useState, useEffect } from 'react';

export default function QuestionList() {

    const [questions, setQuestions] = useState({ name: '', description: '', questions: [] });

    const URL = 'http://localhost:8080/polls/3';

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
            <h4>{questions.description}</h4>
            <p>Questions:</p>
            {questions.questions.map((question, index) => (
                <ul key={question.questionId}>
                    <p>{index + 1}. {question.content}</p>
                </ul>
            ))}
        </div>
    )
}