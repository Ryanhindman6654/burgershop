import styled from 'styled-components'
import Navbar from '../components/Navbar'
import {Box} from 'reflexbox'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.deep_red};
  text-align: center;
`;



export default function Home() {
  return (
    <>
      <Navbar />
      <Box width='100' bg={'primary'}>
        <Box mt={[]} mb={2} bg='#000' height='300px' width={[1, 1/2, 1/4]}>Hello world</Box>
      </Box>
      <Title>Børres Burgere</Title>
    </>
  )
}