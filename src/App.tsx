import "./App.css";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import styled from "styled-components";

export const AppContainer = styled.div`
  margin: 0px auto;
  max-width: 600px;
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  height: 100%;
`;

export const ListContainer = styled.div`
  padding: 40px;
  display: block;
`;

export const ListUl = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

export const ListLi = styled.li`
  margin: 40px 0px;
`;

export const ListText = styled.span`
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: bold;
`;

function App() {
  return (
    <div>
      <AppContainer>
        <Nav />
        <ListContainer>
          <ListUl>
            <ListLi>
              <Link to="/report">
                <ListText>레포트</ListText>
              </Link>
            </ListLi>
            <ListLi>
              <Link to="/passenger">
                <ListText>승객목록</ListText>
              </Link>
            </ListLi>
          </ListUl>
        </ListContainer>
      </AppContainer>
    </div>
  );
}

export default App;
