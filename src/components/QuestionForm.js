import React, { useState } from "react";
function QuestionForm(props) {
  const [form, setForm] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
// Create question data to be Posted in the same format as the data in the json-server file.
    const newQuestion = {
      prompt: form.prompt,
      answers: [
        form.answer1,
        form.answer2,
        form.answer3,
        form.answer4,
      ],
      correctIndex:form.correctIndex,
    };

    //Implementing the post request using the new object.
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
    //Updating the state after.
    .then ((resp)=> resp.json())
    .then((data)=> setForm(data));
  }
 // 
  return (
    <section>
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={form.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={form.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={form.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={form.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={form.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{form.answer1}</option>
            <option value="1">{form.answer2}</option>
            <option value="2">{form.answer3}</option>
            <option value="3">{form.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
