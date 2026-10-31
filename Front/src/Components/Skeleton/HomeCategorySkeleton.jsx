
export default function HomeCategorySkeleton({ count = 4 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="
                        group
                        min-h-80
                        p-4
                        sm:p-5
                        lg:p-6
                        border-r
                        border-b
                        border-white/10
                        relative
                        overflow-hidden
                        flex
                        flex-col
                    "
                >
                    {/* IMAGE SKELETON */}
                    <div
                        className="
                            w-full
                            h-36
                            sm:h-40
                            md:h-44
                            lg:h-40
                            xl:h-44
                            mb-5
                            overflow-hidden
                            rounded-lg
                            bg-white/5
                            animate-pulse
                        "
                    />

                    {/* ICON SKELETON */}
                    <div
                        className="
                            w-9 h-9
                            sm:w-10 sm:h-10
                            rounded-full
                            bg-lime-400/10
                            border border-lime-400/10
                            mb-4
                            animate-pulse
                        "
                    />

                    {/* TITLE SKELETON */}
                    <div
                        className="
                            h-4
                            w-3/5
                            rounded
                            bg-white/10
                            mb-3
                            animate-pulse
                        "
                    />

                    {/* DESCRIPTION SKELETON */}
                    <div className="space-y-2 mb-5">
                        <div className="h-2.5 w-full rounded bg-white/5 animate-pulse" />
                        <div className="h-2.5 w-11/12 rounded bg-white/5 animate-pulse" />
                        <div className="h-2.5 w-2/3 rounded bg-white/5 animate-pulse" />
                    </div>

                    {/* ARROW SKELETON */}
                    <div
                        className="
                            mt-auto
                            w-7 h-7
                            rounded-full
                            border border-white/10
                            bg-white/5
                            animate-pulse
                        "
                    />
                </div>
            ))}
        </>
    );
}
