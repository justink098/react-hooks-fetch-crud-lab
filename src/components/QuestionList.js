import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);
// create a function to delete the question
  function deleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {

        //We use the filter method to cycle through the questions array 
        // giving it a condition which should bring about a new array of qustions 
        // with a different ID from the clicked question's Id.
        const updatedQuestions = questions.filter((q) => q.id !== id);

        //Then we update state with the new array of questions.
        setQuestions(updatedQuestions);
      });
  }



  function answerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        // Here we receive the new updated question
        //Then we create a new variable containing the newly updated array
        // of questions by conditionally mapping through the questions array.
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        //We then use the new updated array of questions to set the state 
        //with the updated questions.
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      deleteClick={deleteClick}
      answerChange={answerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
