// Dosya Yolu: src/components/MuiCard.tsx

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type MuiCardProps = {
  title: string;
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
};

export const MuiCard = ({
  title,
  totalCount,
  activeCount,
  inactiveCount,
}: MuiCardProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Card elevation={2}>
        <CardContent>
          {/* Kart Başlığı */}
          <Box display="flex" alignItems="center" mb={2}>
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              {title} {}
            </Typography>
          </Box>

          {/* İstatistikler */}
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="text.secondary">Toplam Ürün:</Typography>
            <Typography variant="h6" component="span" color="text.primary">
              {totalCount}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mb={1}
            sx={{ color: "success.dark" }}
          >
            <Typography>Aktif Ürünler:</Typography>
            <Typography variant="h6" component="span">
              {activeCount}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ color: "error.dark" }}
          >
            <Typography>Pasif Ürünler:</Typography>
            <Typography variant="h6" component="span">
              {inactiveCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
