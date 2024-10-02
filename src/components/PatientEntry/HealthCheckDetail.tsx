import { ListItemText } from "@mui/material";
import { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry
}

export default function HealthCheckDetail({ entry }: Props) {
  const rating = ['Healthy', 'Low risk', 'High risk', 'Critical risk'];
  return (
    <ListItemText secondary={`Status: ${rating[entry.healthCheckRating]}`} />
  );
}
