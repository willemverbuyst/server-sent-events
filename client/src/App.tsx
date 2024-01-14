import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import List from "./components/List";

function App() {
  return (
    <Box>
      <Container size="2">
        <Box p="6">
          <Heading as="h1" size="7" align="center">
            Server-Sent Events
          </Heading>
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
