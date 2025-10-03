import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Cycle } from "../data/model";

interface CycleSelectionProps {
  cycles: Cycle[];
}

function CycleSelection({ cycles }: CycleSelectionProps) {
  function buildRowFromCycle(cycle: Cycle) {
    return (
      <>
        <TableRow>
          <TableCell>{cycle.name}</TableCell>
          <TableCell>{cycle.bestTotal}</TableCell>
          <TableCell>{cycle.bestSn}</TableCell>
          <TableCell>{cycle.bestCj}</TableCell>
          <TableCell>{cycle.rating}</TableCell>
          <TableCell>
            {cycle.weeks[0].dateWeekStart.toLocaleDateString("en-US")}
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Best Total</TableCell>
            <TableCell>Best Sn</TableCell>
            <TableCell>Best C+J</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{cycles.map((cycle) => buildRowFromCycle(cycle))}</TableBody>
      </Table>
    </>
  );
}

export default CycleSelection;
