
import { useEffect, useState } from "react";
import ProductsCard from "../../../components/ProductsCard";
import { useGetAllproductsQuery } from "../../../redux/features/products/products";
import { TUpdateProduct } from "../admin/types/productUpdate.types";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";

const Products = () => {
  useEffect(() => {
    document.title = "Products | Bi-Cycle Store";
  }, []);

  //redux hook
  const { data, isLoading } = useGetAllproductsQuery(undefined);
  const products = data?.data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Helmet title="Products" />
      <div className="mb-12 mx-auto flex flex-col items-center">
        <h2 className="text-black text-center mb-4 lg:m-10 text-2xl lg:text-3xl font-bold border-yellow-300 pb-2">
          Explore Our <span className="text-yellow-400">Premium</span> Bicycles
        </h2>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-4 w-11/12">
            {currentProducts.map((product: TUpdateProduct) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center md:mx-auto my-20 text-gray-600">
            <img
              src="https://i.imgur.com/oCkEbrA.png"
              alt="Empty box"
              className="mx-auto w-40 h-40 mb-4"
            />
            <p className="text-xl font-semibold">
              Oops! Nothing to ride here... 😢
            </p>
            <p className="text-md">
              Looks like no bicycles are available right now.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 grid grid-cols-4 gap-2 lg:flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-yellow-400`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
