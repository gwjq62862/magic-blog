// components/blog/Pagination.tsx
"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import Button from "../ui/Button";

type Props = {
  canLoadMore: boolean;
  loading: boolean;
  onNext: () => void;
};

const Pagination = ({ canLoadMore, loading, onNext }: Props) => {
  if (!canLoadMore && !loading) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-16 pb-12">
      <Button
        color="secondary"
        size="sm"
        disabled={!canLoadMore || loading}
        onClick={onNext}
      >
        {loading ? "Loading..." : <ArrowRight />}
      </Button>
    </div>
  );
};

export default Pagination;