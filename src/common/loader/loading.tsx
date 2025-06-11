import React from 'react';

interface LoadingProps {
    count?: number;
    className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ count = 12, className = "" }) => {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-[#2e2e2e] aspect-[2/3] rounded-lg mb-3"></div>
                    <div className="bg-[#2e2e2e] h-4 rounded mb-2"></div>
                    <div className="bg-[#2e2e2e] h-3 rounded w-2/3"></div>
                </div>
            ))}
        </div>
    );
}; 


export const PageLoading = ()=>{
    return(
        <div className="min-h-screen w-full bg-[#000000]">
        {/* Back Button Skeleton */}
        <div className="py-6">
          <div className="w-20 h-10 bg-[#2e2e2e] rounded-lg animate-pulse" />
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            {/* Movie Poster Skeleton */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/4] rounded-lg overflow-hidden bg-[#2e2e2e] max-w-md mx-auto lg:mx-0 animate-pulse" />
            </div>

            {/* Movie Information Skeleton */}
            <div className="lg:col-span-3">
              {/* Label Skeleton */}
              <div className="mb-4">
                <div className="w-32 h-4 bg-[#2e2e2e] rounded animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div className="mb-6">
                <div className="w-3/4 h-12 bg-[#2e2e2e] rounded animate-pulse" />
              </div>

              {/* Meta Information Skeleton */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="w-20 h-6 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-16 h-6 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-40 h-6 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-24 h-6 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-20 h-6 bg-[#2e2e2e] rounded animate-pulse" />
              </div>

              {/* Rating and Actions Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div className="flex items-center gap-8">
                  <div className="w-32 h-16 bg-[#2e2e2e] rounded animate-pulse" />
                  <div className="w-40 h-12 bg-[#2e2e2e] rounded animate-pulse" />
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2e2e2e] rounded-full animate-pulse" />
                  <div className="w-10 h-10 bg-[#2e2e2e] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-5/6 h-4 bg-[#2e2e2e] rounded animate-pulse" />
                <div className="w-4/6 h-4 bg-[#2e2e2e] rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Movies Grid Skeleton */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="w-40 h-4 bg-[#2e2e2e] rounded animate-pulse mx-auto mb-2" />
              <div className="w-64 h-8 bg-[#2e2e2e] rounded animate-pulse mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="aspect-[2/3] bg-[#2e2e2e] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}


 export const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
)