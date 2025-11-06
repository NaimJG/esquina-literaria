import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Select, MenuItem } from "@mui/material";

interface BookSorterProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

const BookSorter: React.FC<BookSorterProps> = ({ sortOption, onSortChange }) => {
  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "5px",
        backgroundColor: "transparent",
        boxShadow: "0px 0px 4px 1px #0006",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-sorter-content"
        id="panel-sorter-header"
        sx={{
          minHeight: "48px",
          "&.Mui-expanded": { minHeight: "48px" },
          "& .MuiAccordionSummary-content.Mui-expanded": { margin: 0 },
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Poppins",
          }}
          component="span"
        >
          Ordenamiento
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <FormControl fullWidth size="small">
          <Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            displayEmpty
            sx={{
              fontSize: "14px",
              fontFamily: "Poppins",
              borderRadius: "5px",
              backgroundColor: "transparent",
              boxShadow: "inset 0 0 3px #0005",
              "& .MuiSelect-select": { padding: "8px 12px" },
            }}
          >
            <MenuItem value="">
              <em>-- Seleccionar --</em>
            </MenuItem>
            <MenuItem value="mostComments">Más comentados</MenuItem>
            <MenuItem value="leastComments">Menos comentados</MenuItem>
            <MenuItem value="dateAsc">
              Fecha de publicación (más antiguos)
            </MenuItem>
            <MenuItem value="dateDesc">
              Fecha de publicación (más nuevos)
            </MenuItem>
            <MenuItem value="highestScore">Puntaje más alto</MenuItem>
            <MenuItem value="lowestScore">Puntaje más bajo</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default BookSorter;