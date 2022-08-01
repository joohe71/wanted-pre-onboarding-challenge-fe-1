import axios from "axios";
import React from "react";
import styled from "styled-components";

interface ToDoAddFormProps {
  handleAdd: () => void;
  handleUpdate: (title: string, content: string) => void;
}

// 새로운 할일을 추가하는 폼을 보여주는 컴포넌트
const ToDoAddForm = ({ handleAdd, handleUpdate }: ToDoAddFormProps) => {
  // ToDoAddForm의 데이터 상태를 저장하는 변수
  const [addData, setAddData] = React.useState({ title: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddData({ ...addData, [e.target.id]: e.target.value });
  };
  // 할 일 추가 핸들러
  const handleSubmit = async () => {
    await axios.post("http://localhost:8080/todos", addData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await handleUpdate(addData.title, addData.content);
    await handleAdd();
  };
  return (
    <Container>
      <Form>
        <div>Task title</div>
        <input
          id="title"
          type="text"
          value={addData.title}
          onChange={handleChange}
        />
        <div>Description</div>
        <input
          id="content"
          type="text"
          value={addData.content}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add</button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  border: 2px solid red;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Form = styled.div`
  background-color: white;
`;

export default ToDoAddForm;