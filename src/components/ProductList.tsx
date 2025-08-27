import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { reviewsApi, type ProductsResponse } from './reviews/reviewsApi';

type Props = {
  onSelectProduct: (id: number) => void;
};

export default function ProductList({ onSelectProduct }: Props) {
  const productsQuery = useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: reviewsApi.fetchProducts,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (productsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="animate-pulse">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (productsQuery.isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <FiAlertCircle className="text-red-600 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Could not load products</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          There was a problem loading the product catalog. Please check your connection and try again.
        </p>
        <button
          onClick={() => productsQuery.refetch()}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <FiRefreshCw className="text-sm" />
          <span>Try Again</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {productsQuery.data?.products.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={p} onSelect={onSelectProduct} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}


