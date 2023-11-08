import React, { useContext,useState } from 'react';
import { SubjectsContext } from '../components/SubjectsContextFiles';
import ButtonBar from "../components/ButtonBar";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const SubForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top:50px;
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 10px;
`;

const Label = styled.label`
margin-right:10px
`;

const Input = styled.input`
  font-size:15px;
`;

const Select = styled.select`
  font-size:15px;
`

export default function New(params) {
  const [subData, setSubData] = useState({
    subject_name: "",
    class_type: "",
    professor_name: "",
    color: "",
  });
  const [day, setDay] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });
  const { subjects, setSubjects } = useContext(SubjectsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubData({
      ...subData,
      [name]: value
    });
  };
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/Main");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addSubject=()=>{
    const newSubject = { ...subData, day };
    const newSubjects = [...subjects, newSubject]; 
    setSubjects(newSubjects)
    goMain();
    console.log("과목 배열",newSubjects);
  }

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setDay({
      ...day,
      [name]: checked,
    });
    console.log(day);
  };

  return (
    <div>
      <ButtonBar
        headText={"과목추가"}
        />
      <SubForm onSubmit={handleSubmit}>
        <label>
          과목 <Input name="subject_name" placeholder="과목" onChange={handleChange}></Input>
        </label>
        <Select name="class_type" onChange={handleChange}>
          <option selected disabled hidden>
            과목종류
          </option>
          <option value="전필">전필</option>
          <option value="전선">전선</option>
          <option value="교양">교양</option>
          <option value="기타">기타</option>
        </Select>
        <label>
          교수명 <Input name="professor_name" placeholder="교수명" onChange={handleChange}></Input>
        </label>
        <DayBox>
        월
          <Label>
            <Input
              type="checkbox"
              name="mon"
              checked={day.mon}
              value={day.mon}
              onChange={handleCheckbox}
            />
          </Label>
          화
          <Label>
            <Input
              type="checkbox"
              name="tue"
              checked={day.tue}
              value={day.tue}
              onChange={handleCheckbox}
            />
          </Label>
          수
          <Label>
            <Input
              type="checkbox"
              name="wed"
              checked={day.wed}
              value={day.wed}
              onChange={handleCheckbox}
            />
          </Label>
          목
          <Label>
            <Input
              type="checkbox"
              name="thu"
              checked={day.thu}
              value={day.thu}
              onChange={handleCheckbox}
            />
          </Label>
          금
          <Label>
            <Input
              type="checkbox"
              name="fri"
              checked={day.fri}
              value={day.fri}
              onChange={handleCheckbox}
            />
          </Label>
        </DayBox>
        <label>
          색상 선택 : <input type="color" name="color" onChange={handleChange}></input>
        </label>
        <button type="submit" onClick={addSubject}>과목 추가</button>
      </SubForm>
    </div>
  );
}