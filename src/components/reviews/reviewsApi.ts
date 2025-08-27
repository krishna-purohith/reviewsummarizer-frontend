import axios from 'axios';

export type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

export type Product = {
   name: string;
   id: number;
   description: string | null;
   price: number;
   image: string;
};

export type ProductsResponse = {
   products: Product[];
};

export type SummarizeResponse = {
   summary: string;
};

export type GetReviewsResponse = {
   reviews: Review[];
   summary: string | null;
};

export const reviewsApi = {
   async fetchProducts() {
      return axios
         .get<ProductsResponse>('/api/products')
         .then((res) => res.data);
   },

   async fetchReviews(productId: number) {
      const { data } = await axios.get<GetReviewsResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   },

   async summarizeReviews(productId: number) {
      return axios
         .post<SummarizeResponse>(
            `/api/products/${productId}/reviews/summarize`
         )
         .then((res) => res.data);
   },

   async streamSummary(productId: number, onChunk: (text: string) => void) {
      const response = await fetch(
         `/api/products/${productId}/reviews/summarize-stream`
      );

      if (!response.body) throw new Error('No response body from server');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
         const { value, done: readerDone } = await reader.read();
         done = readerDone;
         if (value) {
            const chunk = decoder.decode(value, { stream: true });
            onChunk(chunk);
         }
      }
   },
};
