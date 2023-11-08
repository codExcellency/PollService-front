import React, { useState, useEffect } from 'react';

export default function QuestionList() {

    const [questions, setQuestions] = useState([]);

    const URL = 'http://localhost:8080/polls/2/questions';

    useEffect(() => {showQuestions()}, [])

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
            <h1>Questions</h1>
            <p>{questions.content}</p>
        </div>
    )
    
}