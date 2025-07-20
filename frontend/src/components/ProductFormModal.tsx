import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 6,
  p: 4,
  borderRadius: 2,
};

interface EditableProduct {
  id?: number;
  name: string;
  productCode: string;
  description: string;
  letterTypes: string;
  maturityTypes: number | null;
  currencies: number;
  channels: number;
  officialLimitType: number | null;
  isActive: boolean;
}

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: EditableProduct) => void;
  productToEdit: EditableProduct | null;
};

const channelOptions = { 1: "Gün Sonu", 2: "Şube", 3: "Genel Müdürlük" };
const currencyOptions = { 1: "TRY", 2: "USD" };
const maturityTypeOptions = {
  1: "Gerçek Kişi",
  2: "Tüzel Kişi",
  3: "Şahıs Firması",
};
const limitTypeOptions = {
  1: "İhracat Alacakları İskonto Programı",
  2: "Marka Kredisi",
  3: "Yurt Dışı Mağazalar Yatırım Kredisi",
};

//değer girili olanlar varsayılan olarak girilenler
const emptyProduct: EditableProduct = {
  name: "",
  productCode: "",
  description: "",
  letterTypes: "",
  maturityTypes: null,
  currencies: 1,
  channels: 2,
  officialLimitType: null,
  isActive: true,
};

export const ProductFormModal = ({
  open,
  onClose,
  onSave,
  productToEdit,
}: ProductFormModalProps) => {
  const [product, setProduct] = useState<EditableProduct>(emptyProduct);

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct(emptyProduct);
    }
  }, [productToEdit, open]);

  const isEditMode = productToEdit !== null;

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    let finalValue: string | boolean | number = value;

    const numericFields = [
      "maturityTypes",
      "currencies",
      "channels",
      "officialLimitType",
    ];
    if (numericFields.includes(name) && value !== "") {
      finalValue = parseInt(value, 10);
    }

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : finalValue,
    }));
  };

  const handleSave = () => {
    onSave(product);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="product-form-title">
      <Box sx={style}>
        <Typography id="product-form-title" variant="h6" component="h2" mb={2}>
          {isEditMode ? "Ürünü Güncelle" : "Yeni Ürün Ekle"}
        </Typography>
        <Grid container spacing={2}>
          {}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="name"
              label="Ürün Adı"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="productCode"
              label="Ürün Kodu"
              value={product.productCode}
              onChange={handleChange}
              disabled={isEditMode}
              InputProps={{ readOnly: isEditMode }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="description"
              label="Açıklama"
              value={product.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="letterTypes"
              label="Mektup Tipleri"
              value={product.letterTypes}
              onChange={handleChange}
            />
          </Grid>

          {}

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Vade Tipleri</InputLabel>
              <Select
                name="maturityTypes"
                value={product.maturityTypes || ""}
                label="Vade Tipleri"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Hiçbiri</em>
                </MenuItem>
                {Object.entries(maturityTypeOptions).map(([val, label]) => (
                  <MenuItem key={val} value={val}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Para Birimleri</InputLabel>
              <Select
                name="currencies"
                value={product.currencies}
                label="Para Birimleri"
                onChange={handleChange}
              >
                {Object.entries(currencyOptions).map(([val, label]) => (
                  <MenuItem key={val} value={val}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Kanallar</InputLabel>
              <Select
                name="channels"
                value={product.channels}
                label="Kanallar"
                onChange={handleChange}
              >
                {Object.entries(channelOptions).map(([val, label]) => (
                  <MenuItem key={val} value={val}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Limit Tipi</InputLabel>
              <Select
                name="officialLimitType"
                value={product.officialLimitType || ""}
                label="Limit Tipi"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Hiçbiri</em>
                </MenuItem>
                {Object.entries(limitTypeOptions).map(([val, label]) => (
                  <MenuItem key={val} value={val}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {}
          <Grid>
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={product.isActive}
                  onChange={handleChange}
                />
              }
              label="Aktif"
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
