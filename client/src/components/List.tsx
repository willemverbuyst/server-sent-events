import { Box, Heading, Table } from "@radix-ui/themes";

export default function List(props: { title: string; data: string[] }) {
  const getFormattedDate = (d: string) => {
    const date = new Date(Number(d));
    const readableDate = date.toLocaleDateString();
    const readableTime = date.toLocaleTimeString();

    return `${readableDate} ${readableTime}`;
  };

  return (
    <Box>
      <Heading>{props.title}</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.data.map((i, index) => (
            <Table.Row key={index}>
              <Table.Cell>#{index + 1}</Table.Cell>
              <Table.Cell>{getFormattedDate(i)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
