import React, { useEffect, useState } from "react";
import { Button, Container, Header, Icon, Label } from "semantic-ui-react";

interface Props {
    result: string
}

export default function ResultDisplay({result}: Props) {
    
  return (
    <>
      <Container text style={{marginTop: "40px", marginBottom: "20px" }}>
        <Header as="h4">The number you draw is:</Header>
        <p style={{color: "red"}}>{result}</p>
      </Container>
    </>
  );
}
