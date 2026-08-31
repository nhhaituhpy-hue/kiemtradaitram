"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { CategoryData, defaultCategories } from "@/data/categories";

type ImageState = "loading" | "loaded" | "error";

interface CategoryCardProps {
  category: CategoryData;
  isHovered: boolean;
  preloadImage: boolean;
  onHoverChange: (categoryId: string | null) => void;
  onOpen: () => void;
}

function CategoryCard({
  category,
  isHovered,
  preloadImage,
  onHoverChange,
  onOpen,
}: CategoryCardProps) {
  const [imageState, setImageState] = useState<ImageState>(
    category.bgImage ? "loading" : "error",
  );
  const isImageLoading = imageState === "loading";

  // Map the configured icon name to a Lucide component safely.
  const Icon = (
    LucideIcons[category.iconName as keyof typeof LucideIcons] ||
    LucideIcons.Folder
  ) as React.ElementType;

  return (
    <motion.div
      onMouseEnter={() => onHoverChange(category.id)}
      onMouseLeave={() => onHoverChange(null)}
      aria-busy={isImageLoading}
      className="relative w-full rounded-[20px] flex flex-col justify-center overflow-hidden border border-[#E0DED5] shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default"
      animate={{
        height: isHovered ? 260 : 130,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Optimized decorative background image. */}
      <div
        className={`absolute inset-0 overflow-hidden ${
          imageState === "error" ? "bg-[#EBE9E1]" : "bg-[#DEDCD4]"
        }`}
      >
        {category.bgImage && (
          <Image
            src={category.bgImage}
            alt=""
            fill
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(100vw - 5rem), 944px"
            preload={preloadImage}
            draggable={false}
            onLoad={() => setImageState("loaded")}
            onError={() => setImageState("error")}
            className={`object-cover object-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              imageState === "loaded" ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-[1.02]" : "scale-100"}`}
          />
        )}
      </div>

      {/* Gradient overlay keeps the real text readable after the image appears. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Hover tint */}
      <motion.div
        className={`absolute inset-0 ${category.hoverColor}`}
        animate={{ opacity: isHovered ? 0.7 : 0 }}
      />

      {/* Card content */}
      <div className="relative z-10 px-8 md:px-12 flex flex-col justify-center h-full text-white">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 opacity-80 mb-1">
            <Icon size={18} />
            <span className="text-xs md:text-sm tracking-widest font-semibold uppercase">
              {category.subtitle || "TEMPLATE"}
            </span>
          </div>

          <motion.h2 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight drop-shadow-md">
            {category.title}
          </motion.h2>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpen();
                  }}
                  className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] px-6 py-2.5 rounded-full font-bold transition-colors shadow-md hover:bg-zinc-100 cursor-pointer"
                >
                  Kiểm tra danh mục
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-card skeleton remains visible until this card's image settles. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 flex h-full flex-col justify-center overflow-hidden bg-[#DEDCD4] px-8 transition-opacity duration-500 md:px-12 motion-reduce:transition-none ${
          isImageLoading
            ? "opacity-100 motion-safe:animate-pulse"
            : "opacity-0"
        }`}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="h-[18px] w-[18px] shrink-0 rounded-md bg-white/65" />
          <div className="h-3 w-40 rounded-full bg-white/65 md:w-56" />
        </div>
        <div className="h-6 w-64 max-w-[85%] rounded-full bg-white/80 md:w-96" />
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const unitParam = params?.unit as string;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Render card shells immediately, then reconcile any saved admin categories.
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);

  useEffect(() => {
    const savedCats = localStorage.getItem("adminCategories");
    let nextCategories = defaultCategories;

    if (savedCats) {
      try {
        const parsed = JSON.parse(savedCats) as CategoryData[];
        let updated = false;
        
        defaultCategories.forEach((defCat, index) => {
          const existing = parsed.find((category) => category.id === defCat.id);
          if (!existing) {
            parsed.splice(index, 0, defCat);
            updated = true;
          } else if (
            existing.bgImage !== defCat.bgImage || 
            existing.subtitle !== defCat.subtitle ||
            existing.title !== defCat.title ||
            existing.shortTitle !== defCat.shortTitle
          ) {
            // Force sync when they change in defaults
            existing.bgImage = defCat.bgImage;
            existing.subtitle = defCat.subtitle;
            existing.title = defCat.title;
            existing.shortTitle = defCat.shortTitle;
            updated = true;
          }
        });
        
        if (updated) {
          localStorage.setItem("adminCategories", JSON.stringify(parsed));
        }
        nextCategories = parsed;
      } catch {
        // Repair invalid saved data so the next visit can load normally.
        localStorage.setItem("adminCategories", JSON.stringify(defaultCategories));
      }
    } else {
      localStorage.setItem("adminCategories", JSON.stringify(defaultCategories));
    }

    // Reconcile client-only storage after hydration instead of cascading a
    // synchronous state update from the effect itself.
    const timeoutId = window.setTimeout(() => {
      setCategories(nextCategories);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto bg-[#F4F3EF] pt-[76px] pb-20 items-center">
      <div className="flex flex-col w-full max-w-5xl px-6 md:px-10 gap-5">
        {categories.map((category, index) => (
          <CategoryCard
            key={`${category.id}:${category.bgImage}`}
            category={category}
            isHovered={hoveredId === category.id}
            preloadImage={index === 0}
            onHoverChange={setHoveredId}
            onOpen={() =>
              router.push(`/dashboard/${unitParam}/${category.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
