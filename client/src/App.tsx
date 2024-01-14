import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect } from "react";
import List from "./components/List";

function App() {
  useEffect(() => {
    const sse = new EventSource("http://localhost:3000/sse");
    console.log("sse :>> ", sse);

    sse.onmessage = (e) => console.log(e?.data);
    sse.onerror = (error) => {
      console.log("ERROR", error);

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <Box>
      <Container size="2">
        <Box p="6">
          <Flex justify="between">
            <Heading as="h1" size="7" align="center">
              Server-Sent Events
            </Heading>
          </Flex>
        </Box>
        <Flex justify="between">
          <List title="Ping" />
          <List title="Pong" />
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
