
export default function ProductSkeleton({ count = 6 }) {
    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
            "
        >
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="
                        overflow-hidden
                        bg-[#101720]
                        border
                        border-white/10
                    "
                >
                    {/* Image Skeleton */}
                    <div
                        className="
                            h-72
                            bg-white/5
                            animate-pulse
                        "
                    />

                    {/* Content Skeleton */}
                    <div className="p-6">
                        {/* Product name */}
                        <div
                            className="
                                h-6
                                w-3/4
                                bg-white/10
                                animate-pulse
                                mb-5
                            "
                        />

                        {/* Description */}
                        <div className="space-y-3 mb-6">
                            <div className="h-3 w-full bg-white/5 animate-pulse" />
                            <div className="h-3 w-5/6 bg-white/5 animate-pulse" />
                            <div className="h-3 w-2/3 bg-white/5 animate-pulse" />
                        </div>

                        {/* Details */}
                        <div
                            className="
                                h-4
                                w-28
                                bg-lime-400/10
                                animate-pulse
                            "
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
