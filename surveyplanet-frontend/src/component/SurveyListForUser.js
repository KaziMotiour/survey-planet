import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import "./css/surveyListForAdmin.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";


const SurveyListForUser = () => {
    //    localStorage.removeItem('userInfo')
  const history = useHistory();
  const [surveyList, setSurveyList] = useState();
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userinfo) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + userinfo.access,
      },
    };

    getSurveyList(config);
  }, []);

  const getSurveyList = async (config) => {
   
      const data = await axios.get("http://127.0.0.1:8000/survey/list", config);
      setSurveyList(data.data);

  };

  const attendingSurvey = (id) =>{
      history.push('/attending-survey/'+id)
  }

  return (
    <Container>
      <Row className='title_row'>
        <Col className='title' md={8}>
          <h2>Survey List</h2>{" "}
        </Col>
      </Row>
      {surveyList &&
        surveyList.map((survey, index) => {
          return survey.is_complete ? (
            <Row key={index} className='survey-Row' style={{backgroundColor:"#ffffff"}}>
              <Col className='col1' md={8}>
                {survey.title}
              </Col>
              <Col className='col2' style={{ color: "red" }}>
                {" "}
                Thank's you have completed the survey{" "}
              </Col>
            </Row>
          ) : (
            <Row key={index} className='survey-Row'  style={{backgroundColor:"#ffffff"}}>
              <Col onClick={e=> attendingSurvey(survey.id)} className='col1' md={8}>
                 
              {survey.title}
             
              </Col>
              <Col onClick={e=> attendingSurvey(survey.id)} className='col2' style={{ color: "blue   " }}>
               
                Click on survey title to attend this survey
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default SurveyListForUser;