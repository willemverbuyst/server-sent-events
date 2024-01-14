import { Button } from "@radix-ui/themes";

export default function RequestBtn() {
  async function handleClick() {
    const response = await fetch("http://localhost:3000/");
    const message = await response.json();

    console.log(message);
  }

  return <Button onClick={handleClick}>Trigger Server</Button>;
}
