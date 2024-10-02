import { List, ListItem, ListItemText } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import HealthCheckDetail from "./HealthCheckDetail";
import HospitalDetail from "./HospitalDetail";
import OccupationalHealthcareDetail from "./OccupationalHealthcareDetail";

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled member ${JSON.stringify(value)}`);
};

export default function PatientEntry({ diagnoses, entry }: Props) {
  let entryData = null;

  switch (entry.type) {
    case 'HealthCheck':
      entryData = <HealthCheckDetail entry={entry} />;
      break;
    case 'Hospital':
      entryData = <HospitalDetail entry={entry} />;
      break;
    case 'OccupationalHealthcare':
      entryData = <OccupationalHealthcareDetail entry={entry} />;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <List>
      <ListItemText
        primary={entry.description}
        secondary={entry.date}
      />
      <List>
        {entry.diagnosisCodes?.map(code => (
          <ListItem key={code}>
            <ListItemText
              primary={`${code} - ${diagnoses.find(d => d.code === code)?.name}`}
            />
          </ListItem>
        ))}
      </List>
      {entryData}
      <ListItemText secondary={`Diagnosed by ${entry.specialist}`} />
    </List>
  );
}
