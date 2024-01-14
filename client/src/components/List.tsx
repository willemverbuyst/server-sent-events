import { Box, Table } from "@radix-ui/themes";

export default function List(props: { title: string }) {
  const data = ["foo", "bar", "quux"];

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{props.title}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((i) => (
            <Table.Row key={i}>
              <Table.Cell>{i}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
