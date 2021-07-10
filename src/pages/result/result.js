import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";

import { Button, Card, Alert, Modal } from "react-bootstrap";
// import { API_create_vote } from "../connection/connection";
import { useHistory } from "react-router-dom";
import "./result.css";
import { API_result_vote } from "../connection/connection";
import { connect } from "react-redux";
import store from "../reducer/store";
function Result(props) {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [code, setCode] = useState("");
  const [option1Count, setOption1Count] = useState(0);
  const [option2Count, setOption2Count] = useState(0);
  const [option3Count, setOption3Count] = useState(0);
  const [show, setShow] = useState(false);
  const [isVoteEnded, setIsVoteEnded] = useState(false);
  const history = useHistory();
  let optionsData = [option1Count, option2Count, option3Count];
  let data = {
    dataBar: {
      labels: [option1, option2, option3],
      datasets: [
        {
          label: `All votes : ${option1Count + option2Count + option3Count}`,
          data: [option1Count, option2Count, option3Count],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
          ],
        },
      ],
    },
  };
  let options = {
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
  useEffect(() => {
   if(props.code===""){
    history.push("/");
    window.location.reload()
   }
    props.socket.on("update", (value) => {
      console.log(value);
      setOption1Count(value.filter((item) => item.result === option1).length);
      setOption2Count(value.filter((item) => item.result === option2).length);
      setOption3Count(value.filter((item) => item.result === option3).length);
      console.log(option1Count, option2Count, option3Count);
    });
    props.socket.on("is_end_vote", (value) => {
      setShow(true)
    });
    props.socket.on("error", (value) => {
      setShow(true)
    });
    console.log(props.code);
    API_result_vote(props.code).then((response) => {
      console.log(response);
      setCode(props.code);

      if (response.state) {
       if(response.result.data===null){
        history.push("/");
        window.location.reload()
       }else{
        setOption1(response.result.voteData.options[0]);
        setOption2(response.result.voteData.options[1]);
        setOption3(response.result.voteData.options[2]);
        setOption1Count(
          response.result.data.filter((item) => item.result === option1).length
        );
        setOption2Count(
          response.result.data.filter((item) => item.result === option2).length
        );
        setOption3Count(
          response.result.data.filter((item) => item.result === option3).length
        );
       }
      } else {
        console.log(response);
      }
    });
  }, [
    props.socket,
    props.code,
    option1,
    option2,
    option3,
    option1Count,
    option2Count,
    option3Count,
    props,
    history,
    code,
  ]);
  return (
    <div className="w-50">
      <Card className="fade-out">
        <Card.Header>
          <Card.Title>Votes Result</Card.Title>
        </Card.Header>
        <Card.Body>
          <Bar data={data.dataBar} options={options.barChartOptions}></Bar>
        </Card.Body>
        <Card.Footer>
          {props.isAdmin ? (isVoteEnded?<Button
              onClick={() => {
                store.dispatch({type:"clear"})
                history.push("/");
                window.location.reload()
              }}
            >
              leave
            </Button>: <Button
              className="bg-danger"
              onClick={() => {
                props.socket.emit("end_vote", {
                  code: props.code,
                  name: props.name,
                });
                setIsVoteEnded(true)
              }}
            >
              stop
            </Button>
           
          ) : (
            <Button
              onClick={() => {
                store.dispatch({type:"clear"})
                history.push("/");
                window.location.reload()
              }}
            >
              leave
            </Button>
          )}
        </Card.Footer>
      </Card>
      {props.isAdmin ? (
       isVoteEnded?<></>: <Alert variant="info">invitation code : {code}</Alert>
      ) : (
        <></>
      )}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>This Vote is end by {props.admin_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The win is {optionsData[optionsData.indexOf(Math.max([...optionsData]))]} :{" "}
          {Math.max([...optionsData])} votes
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              history.push("/");
              window.location.reload()
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function initResult(state) {
  return {
    name: state.user.name,
    code: state.user.code,
    admin_name: state.vote.admin_name,
    isAdmin: state.user.isAdmin,
  };
}

export default connect(initResult)(Result);
