'use client';

import styled from '@emotion/styled';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export default function Home() {
  return (
    <Container>
      <h1>Home Page</h1>
    </Container>
  );
}
