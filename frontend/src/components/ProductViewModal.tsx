import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";

const channelMap = { 1: "Gün Sonu", 2: "Şube", 3: "Genel Müdürlük" };
const currencyMap = { 1: "TRY", 2: "USD" };
const maturityTypeMap = {
  1: "Gerçek Kişi",
  2: "Tüzel Kişi",
  3: "Şahıs Firması",
};
const limitTypeMap = {
  1: "İhracat Alacakları İskonto Programı",
  2: "Marka Kredisi",
  3: "Yurt Dışı Mağazalar Yatırım Kredisi",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Görüntülenecek ürünün tipi
interface Product {
  id: number;
  productCode: string;
  name: string;
  description: string;
  letterTypes: string;
  maturityTypes: number | null;
  currencies: number;
  channels: number;
  officialLimitType: number | null;
  isActive: boolean;
}

// Component'in alacağı props'lar
type ProductViewModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export const ProductViewModal = ({
  open,
  onClose,
  product,
}: ProductViewModalProps) => {
  // ürün yoksa boş göster
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="view-product-title">
      <Box sx={style}>
        <Typography id="view-product-title" variant="h6" component="h2" mb={2}>
          Ürün Detayları
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Adı"
              value={product.name}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Kod"
              value={product.productCode}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Açıklama"
              value={product.description}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Mektup Tipleri"
              value={product.letterTypes}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Vade Tipleri"
              value={
                product.maturityTypes
                  ? maturityTypeMap[product.maturityTypes]
                  : "-"
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Para Birimleri"
              value={currencyMap[product.currencies]}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Kanallar"
              value={channelMap[product.channels]}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Limit Tipi"
              value={
                product.officialLimitType
                  ? limitTypeMap[product.officialLimitType]
                  : "-"
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid size={12}>
            <FormControlLabel
              label="Aktif"
              control={<Switch checked={product.isActive} disabled />}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={onClose}>
            Kapat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
