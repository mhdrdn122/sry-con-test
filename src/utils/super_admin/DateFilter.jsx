import { TextField, FormControl, InputLabel, useTheme } from "@mui/material";

const DateFilter = ({ value, setValue, name, label }) => {
  const theme = useTheme()

    return (
      <FormControl
        
        sx={{ mb: "20px", mr: "22px", bgcolor: "#FFF" , width:"100%" , bgcolor: theme.palette.background.default }}
      >
        <TextField
          id={name}
          name={name}
          type='date'
          value={value}
          label={label}
          onChange={(e) => setValue(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{bgcolor: theme.palette.background.default , color: theme.palette.text.primary }}
          variant="outlined"
          size="small"
          InputProps={{
            inputProps: {
              min: "2020-01-01", 
              max: "2030-12-31", 
            },
          }}
        />
      </FormControl>
    );
  };
  
  export default DateFilter;
  