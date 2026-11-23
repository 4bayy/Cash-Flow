
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

interface StatementDatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export default function DatePicker({
  value,
  onChange,
}: StatementDatePickerProps) {
  return (
    <MuiDatePicker
      label="Statement date"
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy"
      slotProps={{
        textField: {
          fullWidth: true,
          size: "small",
        },
      }}
    />
  );
}
