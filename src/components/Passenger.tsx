import { useEffect, useState } from "react";
import { AppContainer } from "../App";
import Nav from "./Nav";
import styled from "styled-components";
import { ReportContainer } from "./Report";
import { ReportTitle } from "./Report";
import List from "./List";
import axios from "axios";

export const ListWrapper = styled.div`
  display: block;
`;

function Passenger() {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0);

  const passengerLists = () => {
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((res) => {
        setLists(lists.concat(res.data.data));
        //console.log(page);
      })
      .catch((err) => {
        console.error("err msg =>", err);
      });
  };

  useEffect(() => {
    passengerLists();
  }, [page]);

  const scrollToEnd = () => {
    setPage(page + 1);
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  return (
    <div>
      <AppContainer>
        <Nav />
        <ReportContainer>
          <ReportTitle>Passenger List</ReportTitle>
          <ListWrapper>
            {lists.map((list, index) => {
              return <List key={index} list={list} />;
            })}
          </ListWrapper>
        </ReportContainer>
      </AppContainer>
    </div>
  );
}

export default Passenger;
