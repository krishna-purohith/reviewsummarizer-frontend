import { useQuery } from '@tanstack/react-query';
import { IoSparklesSharp } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { reviewsApi, type GetReviewsResponse } from '../reviews/reviewsApi';
import StarIcon from './StarIcon';
import { useStreamSummary } from '@/hooks/useStreamSummary';
import { useEffect, useState } from 'react';

type Props = {
   productId: number;
   onBack: () => void;
};

export default function ReviewList({ productId, onBack }: Props) {
   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
      retry: 2,
      refetchOnWindowFocus: false,
   });

   const { summary, loading, startStreaming } = useStreamSummary(productId);
   const [showSummary, setShowSummary] = useState(false);

   useEffect(() => {
      if (loading) {
         setShowSummary(true);
      }
   }, [loading]);

   useEffect(() => {
      setShowSummary(false);
   }, [productId]);

   if (reviewsQuery.isLoading) {
      return (
         <div className="space-y-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
               ← Back to Products
            </Button>
            <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
         </div>
      );
   }

   if (reviewsQuery.isError) {
      return (
         <div className="space-y-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
               ← Back to Products
            </Button>
            <div className="text-center py-12">
               <div className="text-red-500 text-5xl mb-4">⚠️</div>
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Error loading reviews
               </h3>
               <p className="text-gray-500">Please try again later</p>
               <Button
                  variant="outline"
                  onClick={() => reviewsQuery.refetch()}
                  className="mt-4"
               >
                  Retry
               </Button>
            </div>
         </div>
      );
   }

   const reviews = reviewsQuery.data?.reviews ?? [];
   const avgRating = reviews.length
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : null;

   return (
      <div className="space-y-6">
         {/* Header Section */}
         <div className="flex items-center justify-between">
            <Button
               variant="outline"
               onClick={onBack}
               size="sm"
               className="cursor-pointer"
            >
               ← Back
            </Button>
            <div className="text-right">
               <h2 className="text-xl font-semibold text-gray-700">
                  Customer Reviews
               </h2>
               {avgRating && (
                  <p className="text-sm text-gray-500">
                     {avgRating} / 5 ({reviews.length} reviews)
                  </p>
               )}
            </div>
         </div>

         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-lg font-medium text-indigo-800 mb-3">
               AI-Powered Review Insights
            </h3>
            <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
               Get an intelligent summary of all customer reviews with our AI
               technology
            </p>
            <Button
               onClick={startStreaming}
               disabled={loading || reviews.length === 0}
               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
               size="lg"
            >
               {loading ? (
                  <>
                     <span className="animate-pulse">Generating Summary</span>
                     <div className="ml-2 animate-spin">
                        <IoSparklesSharp size={16} />
                     </div>
                  </>
               ) : (
                  <>
                     Summarize Reviews
                     <IoSparklesSharp className="ml-2" />
                  </>
               )}
            </Button>
            {reviews.length === 0 && (
               <p className="text-xs text-gray-500 mt-2">
                  No reviews available to summarize
               </p>
            )}
         </div>

         {(showSummary || summary) && (
            <div
               className={`p-5 bg-white border border-indigo-100 rounded-xl shadow-sm transition-opacity duration-500 ${summary ? 'opacity-100' : 'opacity-70'}`}
            >
               <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                  <IoSparklesSharp className="text-indigo-600 mr-2" />
                  AI Summary
               </h3>
               <div className="min-h-20">
                  {summary ? (
                     <p className="text-gray-800 whitespace-pre-wrap bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        {summary}
                     </p>
                  ) : (
                     <div className="flex items-center justify-center h-20 bg-indigo-50 rounded-lg border border-indigo-100">
                        <div className="flex space-x-2">
                           <div className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"></div>
                           <div
                              className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                           ></div>
                           <div
                              className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"
                              style={{ animationDelay: '0.4s' }}
                           ></div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}

         <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
               Customer Reviews
            </h3>
            {reviews.length > 0 ? (
               <div className="grid gap-4">
                  {reviews.map((review) => (
                     <Card
                        key={review.id}
                        className="overflow-hidden transition-all hover:shadow-md"
                     >
                        <CardContent className="p-4">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-gray-900">
                                 {review.author}
                              </span>
                              <StarIcon rating={review.rating} />
                           </div>
                           <p className="text-sm text-gray-700 mb-2">
                              {review.content}
                           </p>
                           <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString(
                                 'en-US',
                                 {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                 }
                              )}
                           </p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            ) : (
               <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-gray-400 text-5xl mb-4">😴</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                     No reviews yet
                  </h3>
                  <p className="text-gray-500">
                     This product doesn't have any reviews yet.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
