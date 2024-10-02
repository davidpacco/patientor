import { ListItemText } from "@mui/material";
import { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry
}

export default function HospitalDetail({ entry }: Props) {
  return (
    <ListItemText secondary={`${entry.discharge.date}: ${entry.discharge.criteria}`} />
  );
}
