import axios from 'axios';

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE,
});

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
      const { data } = await api.get<ProductsResponse>('/products');
      return data;
   },

   async fetchReviews(productId: number) {
      const { data } = await api.get<GetReviewsResponse>(
         `/products/${productId}/reviews`
      );
      return data;
   },

   async summarizeReviews(productId: number) {
      return api
         .post<SummarizeResponse>(`/products/${productId}/reviews/summarize`)
         .then((res) => res.data);
   },

   async streamSummary(productId: number, onChunk: (text: string) => void) {
      const response = await fetch(
         `${import.meta.env.VITE_API_BASE}/products/${productId}/reviews/summarize-stream`
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
