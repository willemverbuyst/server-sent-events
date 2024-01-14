import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import List from "./components/List";
import RequestBtn from "./components/RequestBtn";

function App() {
  return (
    <Box>
      <Container size="2">
        <Box p="6">
          <Flex justify="between">
            <Heading as="h1" size="7" align="center">
              Server-Sent Events
            </Heading>
            <RequestBtn />
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
