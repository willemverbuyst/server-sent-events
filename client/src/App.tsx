import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import List from "./components/List";

function App() {
  const [ping, setPing] = useState<string[]>([]);
  const [pong, setPong] = useState<string[]>([]);

  useEffect(() => {
    const sse = new EventSource("http://localhost:3000/sse");

    sse.addEventListener("ping", (e) => {
      setPing((prev) => [...prev, e.data]);
    });
    sse.addEventListener("pong", (e) => {
      setPong((prev) => [...prev, e.data]);
    });

    sse.onmessage = (e) => console.log(e);
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
          <List title="Ping" data={ping} />
          <List title="Pong" data={pong} />
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
