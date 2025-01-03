export default  showQuestions=({questions})=>{
    return(
      <div>
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3>{question.question}</h3>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <p>{option}</p>
                  </li>
                ))}
              </ul>
              <p>Correct Option: {question.correctOptionIndex}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  