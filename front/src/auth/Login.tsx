import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // 유저 로그인 데이터
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  // 유저 로그인 유효성 검사
  const [isValid, setIsValid] = React.useState({
    email: false,
    password: false,
  });
  // 유저 로그인 데이터 변경 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "email") checkEmail(e.target.value);
    if (e.target.name === "password") checkPassword(e.target.value);
    console.log(isValid);
  };
  // 이메일 형식 체크
  const checkEmail = (email: string) => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setIsValid({ ...isValid, email: regex.test(email) });
  };
  // 비밀번호 형식 체크
  const checkPassword = (password: string) => {
    if (password.length < 8) setIsValid({ ...isValid, password: false });
    else setIsValid({ ...isValid, password: true });
  };

  return (
    <Layout>
      <Form>
        <fieldset>
          <legend>로그인</legend>
          <Col>
            <label htmlFor="loginid">아이디(E-mail)</label>
            <input
              type="email"
              id="loginid"
              name="email"
              placeholder="아이디(E-mail)을 입력해 주세요"
              value={userData.email}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <label htmlFor="loginpw">비밀번호</label>
            <input
              type="password"
              id="loginpw"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={userData.password}
              onChange={handleChange}
            />
          </Col>
          <div>
            이 사이트가 처음이신가요?
            <a onClick={() => navigate("/register")}> 회원가입</a>
          </div>

          <button
            type="submit"
            disabled={!isValid.email || !isValid.password}
            onClick={() => {
              alert(`${userData.email} ${userData.password}`);
              console.log(checkEmail(userData.email));
              console.log(checkPassword(userData.password));
            }}
          >
            로그인
          </button>
        </fieldset>
      </Form>
    </Layout>
  );
};

const Layout = styled.div`
  // border: 2px solid red;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  // border: 2px solid red;
  width: 40%;
  height: 50%;
  display: flex;
  justify-content: center;

  * {
    max-width: 400px;
    max-height: 600px;
  }
  fieldset {
    box-sizing: border-box;
    padding: 5%;
    margin: 0;
    width: 100%;
    height: 100%;
    // border: 2px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Login;
