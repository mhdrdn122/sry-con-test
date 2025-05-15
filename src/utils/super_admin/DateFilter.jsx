import { TextField, FormControl, InputLabel } from "@mui/material";

const DateFilter = ({ value, setValue, name, label }) => {
    return (
      <FormControl
        
        // focused
        // size="small"
        // margin="dense"
        sx={{ mb: "20px", mr: "22px", bgcolor: "#FFF" , width:"100%" }}
      >
        {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
        <TextField
          id={name}
          name={name}
          type='date'
          value={value}
          // defaultValue={nowDate}
          label={label}
          onChange={(e) => setValue(e.target.value)}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          InputProps={{
            inputProps: {
              min: "2020-01-01", // Example to set a minimum date
              max: "2030-12-31", // Example to set a maximum date
            },
          }}
        />
      </FormControl>
    );
  };
  
  export default DateFilter;
  