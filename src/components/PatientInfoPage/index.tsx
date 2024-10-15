import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableRow, Alert, Button } from "@mui/material";
import { Male, Female } from '@mui/icons-material';
import patientService from "../../services/patients";
import PatientEntry from "../PatientEntry";
import AddEntryModal from "../AddEntryModal";

interface Props {
  diagnoses: Diagnosis[]
}

export default function PatientInfoPage({ diagnoses }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const id = useParams().id;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
    <>
      <Table>
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
          <TableRow>
            <TableCell>Entries</TableCell>
            {patient.entries?.map(entry => (
              <TableCell
                key={entry.id}
                style={{ display: "flex" }}
              >
                <PatientEntry
                  entry={entry}
                  diagnoses={diagnoses}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table >
      <Button
        variant="contained"
        onClick={openModal}
      >Add new entry</Button>
      <AddEntryModal open={modalOpen} closeModal={closeModal} id={patient.id} />
    </>
  );
}
