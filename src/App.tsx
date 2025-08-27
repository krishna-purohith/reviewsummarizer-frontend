import { useState } from 'react';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import ReviewList from './components/reviews/ReviewList';

function App() {
   const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

   return (
      <div className="min-h-screen bg-gray-50">
         <Navbar />

         <HeroSection />

         <div className="max-w-6xl mx-auto px-4 py-8">
            {selectedProduct ? (
               <ReviewList
                  productId={selectedProduct}
                  onBack={() => setSelectedProduct(null)}
               />
            ) : (
               <ProductList onSelectProduct={setSelectedProduct} />
            )}
         </div>
      </div>
   );
}

export default App;
