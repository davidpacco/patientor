import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableRow, Alert } from "@mui/material";
import { Male, Female } from '@mui/icons-material';
import patientService from "../../services/patients";

export default function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  useEffect(() => {
    setLoading(true);
    if (id) {
      patientService
        .getById(id)
        .then(data => {
          setPatient(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!patient) return <Alert severity="error">No patient found</Alert>;

  let genderIcon = null;

  if (patient.gender === "male") genderIcon = <Male />;
  else if (patient.gender === "female") genderIcon = <Female />;

  return (
    <Table style={{ width: 360 }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <h3>{patient.name} {genderIcon}</h3>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>SSN</TableCell>
          <TableCell>{patient.ssn}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Date of birth</TableCell>
          <TableCell>{patient.dateOfBirth}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Occupation</TableCell>
          <TableCell>{patient.occupation}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
