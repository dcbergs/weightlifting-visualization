import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Cycle } from "../data/model";

interface CycleSelectionProps {
  cycles: Cycle[];
  selectedCycleNames: Set<string>;
  setSelectedCycleNames: (set: Set<string>) => void;
}

function CycleSelection({
  cycles,
  selectedCycleNames,
  setSelectedCycleNames,
}: CycleSelectionProps) {
  const allCyclesSelected = cycles.length === selectedCycleNames.size;

  function handleAllCheckbox() {
    if (allCyclesSelected) {
      setSelectedCycleNames(new Set([]));
    } else {
      setSelectedCycleNames(new Set(cycles.map((c) => c.name)));
    }
  }

  function handleToggleCycle(name: string) {
    if (selectedCycleNames.has(name)) {
      setSelectedCycleNames(selectedCycleNames.difference(new Set([name])));
    } else {
      setSelectedCycleNames(selectedCycleNames.union(new Set([name])));
    }
  }

  function reorderCycles(fromIndex: number, toIndex: number) {
    cycles.splice(toIndex, 0, cycles.splice(fromIndex, 1)[0]);
  }

  function buildRowFromCycle(cycle: Cycle) {
    return (
      <TableRow key={cycle.name}>
        <TableCell>
          <Checkbox
            checked={selectedCycleNames.has(cycle.name)}
            onChange={() => handleToggleCycle(cycle.name)}
          />
        </TableCell>
        {/**put color here in name cell? */}
        <TableCell>{cycle.name}</TableCell>
        <TableCell>{cycle.bestTotal}</TableCell>
        <TableCell>{cycle.bestSn}</TableCell>
        <TableCell>{cycle.bestCj}</TableCell>
        <TableCell>{cycle.rating}</TableCell>
        <TableCell>
          {cycle.weeks[0].dateWeekStart.toLocaleDateString("en-US")}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table sx={{ marginRight: "10px", flexGrow: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={allCyclesSelected}
              onChange={handleAllCheckbox}
              indeterminate={selectedCycleNames.size > 0 && !allCyclesSelected}
            />
          </TableCell>
          <TableCell>Cycle</TableCell>
          <TableCell>Best Total</TableCell>
          <TableCell>Best Sn</TableCell>
          <TableCell>Best C+J</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>Start Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{cycles.map((cycle) => buildRowFromCycle(cycle))}</TableBody>
    </Table>
  );
}

export default CycleSelection;
