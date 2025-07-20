// Dosya Yolu: src/pages/ProductListPage.js

import React, { useState, useEffect, useCallback } from "react";
import { MuiCard } from "../components/MuiCard.tsx";
import { ProductTable } from "../components/ProductTable.tsx";
import { FilterBar } from "../components/FilterBar.tsx";
import { ProductFormModal } from "../components/ProductFormModal.tsx";
import { ProductViewModal } from "../components/ProductViewModal.tsx";
import {
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Button,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const API_URL = "http://localhost:5000/api/products";

export const ProductListPage = () => {
  // === STATE MANAGEMENT ===
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: "", code: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // === DATA FETCHING ===
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        Name: filters.name,
        ProductCode: filters.code,
      }).toString();
      const response = await fetch(`${API_URL}/search?${query}`);
      if (!response.ok) throw new Error("Veriler yüklenemedi.");
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // === EVENT HANDLERS ===
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddNewClick = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleProductSave = async (productData) => {
    const isEditing = selectedProduct !== null;
    const url = isEditing ? `${API_URL}/${selectedProduct.id}` : API_URL;
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { ...selectedProduct, ...productData } : productData
        ),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Ürün ${
            isEditing ? "güncellenemedi" : "kaydedilemedi"
          }. Hata: ${errorText}`
        );
      }
      fetchProducts();
    } catch (e) {
      alert(e.message);
    } finally {
      setIsFormModalOpen(false);
    }
  };

  const handleProductDelete = async (productId) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`${API_URL}/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Ürün silinemedi.");
        }
        fetchProducts();
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    const productToUpdate = products.find((p) => p.id === productId);
    if (!productToUpdate) return;
    const originalProducts = [...products];
    setProducts((currentProducts) =>
      currentProducts.map((p) =>
        p.id === productId ? { ...p, isActive: newStatus } : p
      )
    );
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productToUpdate,
          isActive: newStatus,
          id: productId,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API güncellemesi başarısız oldu. Durum: ${response.status} - ${errorText}`
        );
      }
    } catch (apiError) {
      alert(
        "Ürün durumu güncellenirken bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin."
      );
      setProducts(originalProducts);
    }
  };

  // === CALCULATIONS & DERIVED STATE ===
  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const activeProductsCount = products.filter((p) => p.isActive).length;
  const inactiveProductsCount = products.length - activeProductsCount;

  // === JSX RENDER ===
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" component="h1">
          Ürün Listesi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewClick}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={fetchProducts}
      />

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9}>
            <ProductTable
              products={paginatedProducts}
              onStatusChange={handleStatusChange}
              onDelete={handleProductDelete}
              onEdit={handleEditClick}
              onView={handleViewClick}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <MuiCard
              title="Genel Bakış"
              totalCount={products.length}
              activeCount={activeProductsCount}
              inactiveCount={inactiveProductsCount}
            />
          </Grid>
        </Grid>
      )}

      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Sayfa başına satır:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
      />

      <ProductFormModal
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleProductSave}
        productToEdit={selectedProduct}
      />
      <ProductViewModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};
