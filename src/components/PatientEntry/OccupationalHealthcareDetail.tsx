import { ListItemText } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry
}

export default function OccupationalHealthcareDetail({ entry }: Props) {
  return (
    <>
      <ListItemText secondary={`Employer: ${entry.employerName}`} />
      {entry.sickLeave &&
        <ListItemText
          secondary={`${entry.sickLeave?.endDate}: Leave`}
        />
      }
    </>
  );
}
