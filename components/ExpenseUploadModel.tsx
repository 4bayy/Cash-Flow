import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Alert,
  Divider,
} from "@mui/material";

import {
  CloudUpload,
  TableChartOutlined,
  Download,
  Close,
  DeleteOutlined,
} from "@mui/icons-material";

import {
  LocalizationProvider,
} from "@mui/x-date-pickers/LocalizationProvider";

import {
  AdapterDateFns,
} from "@mui/x-date-pickers/AdapterDateFns";
import DatePicker from "./ui/DatePicker";

interface ExpenseUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: FormData) => void;
}

export default function ExpenseUploadModal({
  open,
  onClose,
  onUpload,
}: ExpenseUploadModalProps) {
  const [statementName, setStatementName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [statementDate, setStatementDate] =
    useState<Date | null>(new Date());

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!statementName || !bankName || !statementDate || !file) {
      setError("Please complete all required fields.");
      return;
    }
    const formData = new FormData();

    formData.append("statementName", statementName);
    formData.append("bankName", bankName);
    formData.append("accountType", accountType);
    formData.append("statementDate", statementDate.toISOString());
    formData.append("file", file);

    onUpload(formData);
  };

  const resetForm = () => {
    setStatementName("");
    setBankName("");
    setAccountType("Savings");
    setStatementDate(new Date());
    setFile(null);
    setError("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              backgroundColor: "#F7FBF7",
              maxWidth:520
            },
          },
        }}
      >
        <DialogTitle sx={{ px: 2.5, py: 1.5 }}>
          <Stack direction="row"   sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}>
            <Box>
              <Typography variant="h6" sx={{fontWeight :700}}>
                Import expenses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload your monthly bank statement
              </Typography>
            </Box>

            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5}>

            <TextField
                 size="small"
              label="Statement name"
              placeholder="November 2026 Expenses"
              fullWidth
              required
              value={statementName}
              onChange={(e) => setStatementName(e.target.value)}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Bank / Account"
                placeholder="HDFC Bank"
                fullWidth
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />

              <TextField
                select
                label="Account type"
                fullWidth
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <MenuItem value="Savings">Savings</MenuItem>
                <MenuItem value="Current">Current</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </TextField>
            </Stack>

            <DatePicker
              value={statementDate}
              onChange={setStatementDate}
            />

            <Divider />

            <Typography sx={{fontWeight :600}}>
              Upload CSV file
            </Typography>

            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{
                minHeight: 150,
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#8DB99A",
                color: "#34764A",
                backgroundColor: "#EDF7EF",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                "&:hover": {
                  backgroundColor: "#E3F2E6",
                  borderWidth: 2,
                },
              }}
            >
              <CloudUpload sx={{ fontSize: 42 }} />
              <Typography sx={{fontWeight :600}}>
                Drop your CSV file or browse
              </Typography>
              <Typography variant="caption">
                CSV only · Maximum 5 MB
              </Typography>

              <input
                hidden
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
              />
            </Button>

            {file && (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  alignItems :"center",
                  backgroundColor: "#E8F5E9",
                }}
              >
                <TableChartOutlined color="success" />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{fontWeight :600}}>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => setFile(null)}
                  color="error"
                >
                  <DeleteOutlined />
                </IconButton>
              </Stack>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              component="a"
              href="/sample_expense_transactions.csv"
              download
              startIcon={<Download />}
              sx={{ color: "#34764A", alignSelf: "flex-start" }}
            >
              Download sample CSV
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                py: 1.5,
                backgroundColor: "#34764A",
                "&:hover": {
                  backgroundColor: "#285E3A",
                },
              }}
            >
              Import transactions
            </Button>

          </Stack>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}
