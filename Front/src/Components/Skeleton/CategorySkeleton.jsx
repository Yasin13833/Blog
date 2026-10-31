
export default function CategorySkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <article
                    key={index}
                    className="
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-[#101720]
                    "
                >
                    {/* Image */}
                    <div
                        className="
                            h-56
                            bg-white/5
                            animate-pulse
                        "
                    />

                    {/* Content */}
                    <div className="p-5">
                        {/* Category name */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="h-5 w-3/5 rounded bg-white/10 animate-pulse" />

                            <div className="w-9 h-9 shrink-0 rounded-full bg-white/5 animate-pulse" />
                        </div>

                        {/* Description */}
                        <div className="mt-5 space-y-3">
                            <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
                            <div className="h-3 w-5/6 rounded bg-white/5 animate-pulse" />
                            <div className="h-3 w-2/3 rounded bg-white/5 animate-pulse" />
                        </div>

                        {/* Bottom */}
                        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                            <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />

                            <div className="w-4 h-4 rounded bg-white/5 animate-pulse" />
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
}
