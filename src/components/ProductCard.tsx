import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from './reviews/reviewsApi';

type Props = {
   product: Product;
   onSelect: (id: number) => void;
};

export default function ProductCard({ product, onSelect }: Props) {
   return (
      <Card className="hover:shadow-lg transition rounded-2xl">
         <CardContent className="p-4 flex flex-col items-center">
            <img
               src={product.image}
               alt={product.name}
               className="h-40 w-40 object-cover rounded-xl mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
               {product.description}
            </p>
            <p className="mt-2 font-bold">₹{product.price}</p>
            <Button
               className="mt-4 w-full
               bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full cursor-pointer"
               onClick={() => onSelect(product.id)}
            >
               View Reviews
            </Button>
         </CardContent>
      </Card>
   );
}
