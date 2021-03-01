import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.deep_red};
  text-align: center;
`

export default function Home() {
  return (
    <Title>Børres Burgere</Title>
  )
}