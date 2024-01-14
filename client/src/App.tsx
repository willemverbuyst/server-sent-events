import * as Toast from "@radix-ui/react-toast";
import { Box, Container, Heading } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

function App() {
  const [msg, setMsg] = useState<{ title: string; timeStamp: string } | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());

  function getFormattedDate(d: string) {
    const date = new Date(Number(d));
    const readableDate = date.toLocaleDateString();
    const readableTime = date.toLocaleTimeString();

    return `${readableDate} ${readableTime}`;
  }

  useEffect(() => {
    const sse = new EventSource("http://localhost:3000/sse");

    sse.addEventListener("ping", (e) => {
      setMsg({ title: "PING", timeStamp: e.data });
      setOpen(true);
    });
    sse.addEventListener("pong", (e) => {
      setMsg({ title: "PONG", timeStamp: e.data });
      setOpen(true);
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
    <Toast.Provider swipeDirection="right">
      <Box>
        <Container size="2">
          <Box p="6">
            <Heading as="h1" size="7" align="center">
              Server-Sent Events
            </Heading>
          </Box>
        </Container>
      </Box>
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        {msg && (
          <>
            <Toast.Title className="ToastTitle">{msg.title}</Toast.Title>
            <Toast.Description asChild>
              <time
                className="ToastDescription"
                dateTime={eventDateRef.current.toISOString()}
              >
                {getFormattedDate(msg?.timeStamp)}
              </time>
            </Toast.Description>
          </>
        )}
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}

export default App;
