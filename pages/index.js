import styled from "styled-components";
import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <InnerWrapper>
            <Left>
              <HeroText />
            </Left>
            <ImgWrapper />
          </InnerWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

const ImgWrapper = styled.div`
  height: 60%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-image: url("https://images.unsplash.com/photo-1571342169924-b85ca4a01fa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 670px) {
    display: none;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.light_green};
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

const InnerWrapper = styled.div`
  max-width: 1000px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Left = styled.div`
  width: 40%;
  @media (max-width: 670px) {
    width: 100%;
  }
`;
