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