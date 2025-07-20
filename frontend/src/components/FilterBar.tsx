import React from "react";
import { Grid, TextField, Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type FilterBarProps = {
  filters: {
    name: string;
    code: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export const FilterBar = ({
  filters,
  onFilterChange,
  onSearch,
}: FilterBarProps) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <TextField
            fullWidth
            size="small"
            label="Ürün Adına Göre Ara"
            name="name"
            value={filters.name}
            onChange={onFilterChange}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            size="small"
            label="Ürün Koduna Göre Ara"
            name="code"
            value={filters.code}
            onChange={onFilterChange}
          />
        </Grid>
        <Grid>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={onSearch}
          >
            Ara
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
