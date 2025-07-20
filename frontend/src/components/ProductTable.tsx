import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

type ProductTableProps = {
  products: Product[];
  onStatusChange: (productId: number, newStatus: boolean) => void;
  onDelete: (productId: number) => void;
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
};

export const ProductTable = ({
  products,
  onStatusChange,
  onDelete,
  onEdit,
  onView,
}: ProductTableProps) => {
  return (
    <Paper elevation={2}>
      <TableContainer>
        {}
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Aktif
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ürün Adı</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ürün Kodu</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Açıklama</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mektup Tipleri</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Vade Tipleri</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Para Birimleri</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kanallar</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Limit Tipi
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell align="center">
                  <Tooltip title={product.isActive ? "Pasif Yap" : "Aktif Yap"}>
                    <Checkbox
                      checked={product.isActive}
                      onChange={(event) =>
                        onStatusChange(product.id, event.target.checked)
                      }
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.productCode}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={product.description}>
                    <span>{product.description}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{product.letterTypes}</TableCell>
                <TableCell>
                  {product.maturityTypes
                    ? maturityTypeMap[product.maturityTypes]
                    : "-"}
                </TableCell>
                <TableCell>{currencyMap[product.currencies]}</TableCell>
                <TableCell>{channelMap[product.channels]}</TableCell>
                <TableCell align="center">
                  {product.officialLimitType
                    ? limitTypeMap[product.officialLimitType]
                    : "-"}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Görüntüle">
                    <IconButton
                      color="default"
                      size="small"
                      onClick={() => onView(product)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Düzenle">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onEdit(product)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
