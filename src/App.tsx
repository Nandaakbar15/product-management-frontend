import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDataPages from "./pages/dashboard/productData/IndexProduct";
import AddProductPages from "./pages/dashboard/productData/AddProduct";
import BrandDataPages from "./pages/dashboard/brandData/IndexBrandData";
import AddBrandPages from "./pages/dashboard/brandData/AddBrand";
import SupplierDataPages from "./pages/dashboard/supplierData/IndexSupplier";
import AddSupplierPages from "./pages/dashboard/supplierData/AddSupplier";
import CategoryDataPages from "./pages/dashboard/categoriesData/IndexCategory";
import EditProductPages from "./pages/dashboard/productData/EditProduct";
import AddCategoriesPages from "./pages/dashboard/categoriesData/AddCategory";
import EditBrandPages from "./pages/dashboard/brandData/EditBrand";
import EditSupplierPages from "./pages/dashboard/supplierData/EditSupplier";
import EditCategoriesPages from "./pages/dashboard/categoriesData/EditCategory";
import ProductVariantDataPages from "./pages/dashboard/productVariants/IndexProductVariantData";
import AddProductVariantPages from "./pages/dashboard/productVariants/AddProductVariants";
import EditProductVariantPages from "./pages/dashboard/productVariants/EditProductVariants";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Routes product pages */}
        <Route path="/product_data" element={<ProductDataPages />} />
        <Route path="/add_product" element={<AddProductPages />} />
        <Route path="/edit_product/:id" element={<EditProductPages />} />

        {/* Routes Brand pages*/}
        <Route path="/brand_data" element={<BrandDataPages />} />
        <Route path="/add_brand" element={<AddBrandPages />} />
        <Route path="/edit_brand/:id" element={<EditBrandPages />} />

        {/* Routes Supplier pages */}
        <Route path="/supplier_data" element={<SupplierDataPages />} />
        <Route path="/add_supplier" element={<AddSupplierPages />} />
        <Route path="/edit_supplier/:id" element={<EditSupplierPages />} />

        {/* Routes Category pages */}
        <Route path="/category_data" element={<CategoryDataPages />} />
        <Route path="/add_category" element={<AddCategoriesPages />} />
        <Route path="/edit_category/:id" element={<EditCategoriesPages />} />

        {/* Routes Product Variant pages */}
        <Route
          path="/product_variant_data"
          element={<ProductVariantDataPages />}
        />
        <Route
          path="/add_product_variant"
          element={<AddProductVariantPages />}
        />
        <Route
          path="/edit_product_variant/:id"
          element={<EditProductVariantPages />}
        />
      </Routes>
    </BrowserRouter>
  );
}
