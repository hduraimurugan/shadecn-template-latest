import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconPhoto } from "@tabler/icons-react"

function ProductImageGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
        <IconPhoto size={40} className="text-muted-foreground/40" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-lg overflow-hidden bg-muted/30">
        <img
          src={images[activeIndex]}
          alt="Product"
          className="w-full h-64 object-cover"
        />
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
            <IconPhoto size={12} />
            {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "size-14 rounded-lg overflow-hidden border-2 transition-colors shrink-0",
                i === activeIndex
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <img src={img} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ProductImageGallery }
