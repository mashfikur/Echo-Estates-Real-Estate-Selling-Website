import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

export default function SortButton({ sort, setSort }) {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120,  }}>
        <InputLabel
          sx={{ color: "white" }}
          id="demo-simple-select-helper-label"
        >
          Sort
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sort}
          label="Sort"
          onChange={handleChange}
          sx={{ color: "white",borderColor: "white" }}
        >
          <MenuItem value={"asc"}>Asc</MenuItem>
          <MenuItem value={"desc"}>Desc</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

SortButton.propTypes = {
  sort: PropTypes.string,
  setSort: PropTypes.func,
};
