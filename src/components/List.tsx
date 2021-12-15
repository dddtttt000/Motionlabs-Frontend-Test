import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  list: {
    _id: string;
    name: string;
    trips: number;
    airline: [
      {
        id: number;
        name: string;
        country: string;
        logo: string;
        slogan: string;
        head_quaters: string;
        website: string;
        established: string;
      },
    ];
    __v: number;
  };
}

export const PassengerWrapper = styled.div`
  border-top: 1px solid rgb(241, 243, 249);
  display: block;
`;

export const PassengerWrap = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 20px 0px;
`;

export const PassengerTitleWrap = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

export const PassengerName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

export const PassengerTrips = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgb(0, 0, 0);
`;

export const AirlineWrap = styled.div`
  margin-top: 10px;
  background-color: rgb(242, 242, 242);
  padding: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;

  > img {
    width: 80px;
  }
`;

export const AirlineSlogan = styled.div`
  margin-left: 10px;
  font-size: 14px;
`;

export const PassengerId = styled.div`
  margin-top: 20px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(211, 211, 211);
  text-align: right;
`;

export default function List({ list }: Props): ReactElement {
  return (
    <>
      <PassengerWrapper key={list._id}>
        <PassengerWrap>
          <PassengerTitleWrap>
            <PassengerName>{list.name}</PassengerName>
            <PassengerTrips>{list.trips} trips</PassengerTrips>
          </PassengerTitleWrap>
          {list.airline.map((el, index) => {
            return (
              <>
                <AirlineWrap key={index}>
                  <img src={el.logo} alt="" />
                  <AirlineSlogan key={el.id}>{el.slogan}</AirlineSlogan>
                </AirlineWrap>
              </>
            );
          })}
          <PassengerId>{list._id}</PassengerId>
        </PassengerWrap>
      </PassengerWrapper>
    </>
  );
}
