import React from 'react';

interface EmptyStateProps {
    title?: string;
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No Movies Found",
    message = "We couldn't find any movies matching your search criteria. Try adjusting your filters or search terms."
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 mb-6 text-[var(--primary-color)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 max-w-md">
                {message}
            </p>
        </div>
    );
}; 