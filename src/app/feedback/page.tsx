"use client";

import Avatar from "@/components/ui/Avatar";
import { feedbackItems } from "@/lib/data";
import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

const avgRating =
  feedbackItems.reduce((sum, f) => sum + f.rating, 0) / feedbackItems.length;

const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: feedbackItems.filter((f) => f.rating === star).length,
}));

export default function FeedbackPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Feedback</h2>
          <p className="text-xs text-gray-400 mt-0.5">Student reviews and ratings</p>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-10">
        <div className="text-center flex-shrink-0">
          <p className="text-5xl font-bold text-primary-500">{avgRating.toFixed(1)}</p>
          <StarRating rating={Math.round(avgRating)} />
          <p className="text-xs text-gray-400 mt-1">{feedbackItems.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {ratingDistribution.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-4">{star}</span>
              <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 bg-amber-400 rounded-full transition-all"
                  style={{ width: `${(count / feedbackItems.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-3">
        {feedbackItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-2">
              <Avatar name={item.name} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                  <p className="text-[10px] text-gray-400">{item.date}</p>
                </div>
                <StarRating rating={item.rating} />
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-8">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
