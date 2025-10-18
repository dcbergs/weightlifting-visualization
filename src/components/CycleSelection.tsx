import {
  Checkbox,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import type { Cycle } from "../data/model";
import { useState, type SetStateAction } from "react";
import React from "react";

interface CycleSelectionProps {
  cycles: Cycle[];
  setCycles: React.Dispatch<SetStateAction<Cycle[]>>;
  selectedCycleNames: Set<string>;
  setSelectedCycleNames: (set: Set<string>) => void;
}

function CycleSelection({
  cycles,
  setCycles,
  selectedCycleNames,
  setSelectedCycleNames,
}: CycleSelectionProps) {
  const allCyclesSelected = cycles.length === selectedCycleNames.size;

  type SortBy = "rating" | "bestSn" | "bestCj" | "bestTotal" | "startDate";
  type SortOrder = "asc" | "desc";

  // default way data is sorted in parent component
  const [sortBy, setSortBy] = useState<SortBy>("startDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [expandedCycle, setExpandedCycle] = useState<string | null>(null);

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

  function oppositeOrder(sortOrder: SortOrder) {
    return sortOrder === "asc" ? "desc" : "asc";
  }

  function requestSort(sortBy: SortBy, sortOrder: SortOrder) {
    const nextState = [...cycles];
    if (sortBy === "startDate") {
      if (sortOrder === "asc") {
        setCycles(
          nextState.sort(
            (a, b) => +a.weeks[0].dateWeekStart - +b.weeks[0].dateWeekStart,
          ),
        );
      } else {
        setCycles(
          nextState.sort(
            (a, b) => +b.weeks[0].dateWeekStart - +a.weeks[0].dateWeekStart,
          ),
        );
      }
    } else {
      if (sortOrder === "asc") {
        setCycles(nextState.sort((a, b) => a[sortBy] - b[sortBy]));
      } else {
        setCycles(nextState.sort((a, b) => b[sortBy] - a[sortBy]));
      }
    }
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  }

  function buildRowFromCycle(cycle: Cycle) {
    return (
      <React.Fragment key={cycle.name}>
        <TableRow
          onClick={() =>
            setExpandedCycle(expandedCycle === cycle.name ? null : cycle.name)
          }
          // hide borders for this row and keep 'em for the expandy description
          // row so that borders are always correct expanded or not
          sx={{ "& td": { borderBottom: 0 } }}
        >
          <TableCell>
            <Checkbox
              checked={selectedCycleNames.has(cycle.name)}
              // prevent clicking on the checkbox causing the opening
              // of the cycle's description too (as a TableRow click event)
              onClick={(e) => e.stopPropagation()}
              onChange={() => handleToggleCycle(cycle.name)}
            />
          </TableCell>
          {/**put color here in name cell? */}
          <TableCell>{cycle.name}</TableCell>
          <TableCell align="right">{cycle.rating}</TableCell>
          <TableCell sx={{ borderBottom: 0 }} align="right">
            {cycle.bestSn}
          </TableCell>
          <TableCell align="right">{cycle.bestCj}</TableCell>
          <TableCell align="right">{cycle.bestTotal}</TableCell>
          <TableCell align="right">
            {cycle.weeks[0].dateWeekStart.toLocaleDateString("en-US")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse
              in={expandedCycle === cycle.name}
              timeout="auto"
              unmountOnExit
            >
              <p>{cycle.description}</p>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Table
      size="small"
      sx={{
        maxWidth: "800px",
        minWidth: "600px",
        marginRight: "10px",
        flexGrow: 2,
        userSelect: "none",
      }}
      padding="none"
    >
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
          <TableCell align="right">
            <TableSortLabel
              active={sortBy === "rating"}
              direction={sortOrder}
              // if we're already sorting by this one, sort by the opposite, otherwise sort ascending
              onClick={() =>
                requestSort(
                  "rating",
                  sortBy === "rating" ? oppositeOrder(sortOrder) : "asc",
                )
              }
            >
              Rating
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={sortBy === "bestSn"}
              direction={sortOrder}
              // if we're already sorting by this one, sort by the opposite, otherwise sort ascending
              onClick={() =>
                requestSort(
                  "bestSn",
                  sortBy === "bestSn" ? oppositeOrder(sortOrder) : "asc",
                )
              }
            >
              Best Sn
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={sortBy === "bestCj"}
              direction={sortOrder}
              // if we're already sorting by this one, sort by the opposite, otherwise sort ascending
              onClick={() =>
                requestSort(
                  "bestCj",
                  sortBy === "bestCj" ? oppositeOrder(sortOrder) : "asc",
                )
              }
            >
              Best Cj
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={sortBy === "bestTotal"}
              direction={sortOrder}
              // if we're already sorting by this one, sort by the opposite, otherwise sort ascending
              onClick={() =>
                requestSort(
                  "bestTotal",
                  sortBy === "bestTotal" ? oppositeOrder(sortOrder) : "asc",
                )
              }
            >
              Best Total
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={sortBy === "startDate"}
              direction={sortOrder}
              // if we're already sorting by this one, sort by the opposite, otherwise sort ascending
              onClick={() =>
                requestSort(
                  "startDate",
                  sortBy === "startDate" ? oppositeOrder(sortOrder) : "asc",
                )
              }
            >
              Start Date
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{cycles.map((cycle) => buildRowFromCycle(cycle))}</TableBody>
    </Table>
  );
}

export default CycleSelection;
