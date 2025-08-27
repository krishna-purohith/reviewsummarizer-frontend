import { reviewsApi } from "@/components/reviews/reviewsApi";
import { useState } from "react";


export const useStreamSummary = (productId: number | null) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const startStreaming = async () => {
    if (!productId) return;
    setSummary("");
    setLoading(true);
    try {
      await reviewsApi.streamSummary(productId, (chunk) =>
        setSummary((prev) => prev + chunk)
      );
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, startStreaming };
};
