
export default function QuestionList() {

    const [questions, setQuestions] = useState([]);

    const URL = 'http://localhost:8080/polls/1/questions';

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
            <p></p>
        </div>
    )
    
}