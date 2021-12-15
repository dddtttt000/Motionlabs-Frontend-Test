import { useEffect, useState } from "react";
import { AppContainer } from "../App";
import Nav from "./Nav";
import styled from "styled-components";
import axios from "axios";

export const ReportContainer = styled.div`
  padding: 20px;
  display: block;
`;

export const ReportTitle = styled.h2`
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

export const ReportView = styled.div`
  border: 1px solid rgb(234, 234, 234);
  border-radius: 10px;
`;

export const ReportDescWrap = styled.div`
  padding: 10px;
  display: block;

  > .desc {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;

    > .cycle-wrap {
      display: flex;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;

      > .cycle {
        background-color: rgb(34, 34, 34);
        width: 7px;
        height: 7px;
        border-radius: 14px;
        margin-right: 6px;
      }
    }

    > .term-wrap {
      display: flex;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;

      > .term {
        background-color: rgb(34, 34, 34);
        width: 22px;
        height: 7px;
        border-radius: 14px;
        margin-right: 6px;
        margin-left: 18px;
      }
    }
  }
`;

export const DescText = styled.span`
  font-size: 10px;
  color: rgb(96, 96, 96);
  margin-right: 4px;
`;

export const LineContainer = styled.div`
  display: block;
`;

export const LineWrap = styled.div`
  position: relative;
`;

export const CycleTextWrap = styled.div<IText>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

interface IText {
  x: number;
  y: number;
}

const Text = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;

export const BarContainer = styled.div`
  margin-top: 40px;
`;

export const BarWrap = styled.div`
  display: flex;
  padding-left: 46.5px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Bar = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  -webkit-box-align: center;
  width: 93px;
`;

const BarDate = styled.div`
  margin-top: 5px;
`;

const BarDateText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgb(85, 85, 85);
`;

const DayWrap = styled.div`
  margin-top: -23px;
  text-align: center;
`;

const DayText = styled.span`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: rgb(85, 85, 85);
`;

interface IBar {
  height: string;
}

const EmptyBar = styled.div<IBar>`
  height: ${(props) => props.height}px;
  width: 30px;
  background-color: rgb(255, 255, 255);
`;

const FillBar = styled.div<IBar>`
  border-radius: 10px;
  height: ${(props) => props.height}px;
  width: 30px;
  background-color: rgb(51, 51, 51);
`;

interface Data {
  startDate: string;
  endDate: string;
  period: number;
  cycle: number;
}

function Report() {
  const [data, setData] = useState<Data[]>([]);

  const getData = () => {
    axios
      .get(`https://motionz-kr.github.io/playground/apis/report.json`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("err msg=>", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AppContainer>
        <Nav />
        <ReportContainer>
          <ReportTitle>User Report</ReportTitle>
          <ReportView>
            <ReportDescWrap>
              <div className="desc">
                <div className="cycle-wrap">
                  <div className="cycle"></div>
                  <DescText>활동 주기</DescText>
                </div>
                <div className="term-wrap">
                  <div className="term"></div>
                  <DescText>활동 기간, 시작일</DescText>
                </div>
              </div>
            </ReportDescWrap>
            <LineContainer>
              <LineWrap>
                <svg height="160" width="556">
                  {data.map((el, index) => {
                    const x = index;
                    return (
                      <>
                        <line
                          x1={(556 / 6) * (x + 1)}
                          y1={160 - data[x].cycle}
                          x2={
                            x + 2 !== 6
                              ? (556 / 6) * (x + 2)
                              : (556 / 6) * (x + 1)
                          }
                          y2={
                            x + 1 !== 5
                              ? 160 - data[x + 1].cycle
                              : 160 - data[x].cycle
                          }
                          stroke="#222"
                          strokeWidth="2"
                        ></line>
                        <circle
                          cx={(556 / 6) * (x + 1)}
                          cy={160 - el.cycle}
                          r="4.5"
                          fill="#222"
                        ></circle>
                      </>
                    );
                  })}
                </svg>
                {data.map((el, index) => {
                  const x = (556 / 6) * (index + 1) - 12;
                  const y = 160 - el.cycle - 30;
                  return (
                    <CycleTextWrap key={index} x={x} y={y}>
                      <Text
                        color={
                          el.cycle < 100
                            ? "rgb(112, 112, 112)"
                            : "rgb(255, 117, 102)"
                        }
                      >
                        {el.cycle} 일
                      </Text>
                    </CycleTextWrap>
                  );
                })}
              </LineWrap>
            </LineContainer>
            <BarContainer>
              <BarWrap>
                {data.map((el, index) => {
                  return (
                    <>
                      <Bar key={index}>
                        <EmptyBar
                          height={`${100 - Math.round((el.period * 100) / 15)}`}
                        ></EmptyBar>
                        <FillBar
                          height={`${Math.round((el.period * 100) / 15)}`}
                        >
                          <DayWrap>
                            <DayText>{el.period} 일</DayText>
                          </DayWrap>
                        </FillBar>
                        <BarDate>
                          <BarDateText>
                            {el.startDate.replaceAll("-", "/").slice(5)}
                          </BarDateText>
                        </BarDate>
                      </Bar>
                    </>
                  );
                })}
              </BarWrap>
            </BarContainer>
          </ReportView>
        </ReportContainer>
      </AppContainer>
    </div>
  );
}

export default Report;
