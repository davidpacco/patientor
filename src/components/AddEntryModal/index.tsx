import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import patientService from "../../services/patients";
import { HealthCheckEntry } from "../../types";
import axios from "axios";

interface Props {
  open: boolean
  closeModal: () => void
  id: string
}

export default function AddEntryModal({ open, closeModal, id }: Props) {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [error, setError] = useState<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry: Omit<HealthCheckEntry, 'id'> = {
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodes.replaceAll(" ", "").split(","),
      type: "HealthCheck",
      healthCheckRating: Number(healthCheckRating)
    };

    try {
      await patientService.addEntry(id, newEntry);
      closeModal();
      setError(undefined);
      setDate("");
      setSpecialist("");
      setDescription("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === "string") {
          setError(e.response.data.replace('Something went wrong. Error: ', ''));
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unrecognized error");
      }
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: "form",
        onSubmit
      }}
    >
      <DialogTitle>Entry Details</DialogTitle>
      {error && <Alert severity="error">{error}</Alert>}
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Specialist"
          required
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          multiline
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Health Check Rating"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="contained" type="submit">Add entry</Button>
      </DialogActions>
    </Dialog>
  );
}