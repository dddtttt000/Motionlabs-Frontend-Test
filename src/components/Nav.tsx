import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.header`
  height: 70px;
  background-color: rgb(0, 0, 0);
`;

export const NavContent = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 20px;
`;

export const NavText = styled.h2`
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

function Nav() {
  return (
    <>
      <NavContainer>
        <NavContent>
          <Link to="/">
            <NavText>Motionlabs</NavText>
          </Link>
        </NavContent>
      </NavContainer>
    </>
  );
}

export default Nav;
