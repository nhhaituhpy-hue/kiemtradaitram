"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { CategoryData, defaultCategories } from "@/data/categories";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const unitParam = params?.unit as string;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const savedCats = localStorage.getItem("adminCategories");
    if (savedCats) {
      try {
        let parsed = JSON.parse(savedCats);
        let updated = false;
        
        defaultCategories.forEach((defCat, index) => {
          const existing = parsed.find((c: any) => c.id === defCat.id);
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
        setCategories(parsed);
      } catch (e) {
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
      localStorage.setItem("adminCategories", JSON.stringify(defaultCategories));
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto bg-[#F4F3EF] pt-[76px] pb-20 items-center">
      <div className="flex flex-col w-full max-w-5xl px-6 md:px-10 gap-5">
        {categories.map((category) => {
          const isHovered = hoveredId === category.id;
          // Map string icon name to actual Lucide component safely
          const Icon = (LucideIcons[category.iconName as keyof typeof LucideIcons] || LucideIcons.Folder) as React.ElementType;
          
          return (
            <motion.div
              key={category.id}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative w-full rounded-[20px] flex flex-col justify-center overflow-hidden border border-[#E0DED5] shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default"
              animate={{
                height: isHovered ? 260 : 130,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {/* Background Image & Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ 
                  backgroundImage: category.bgImage ? `url(${category.bgImage})` : 'none',
                  backgroundColor: category.bgImage ? 'transparent' : '#EBE9E1',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  backgroundPositionY: "center"
                }}
              />
              
              {/* Gradient Overlay to make text readable on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-0 bg-black/10" />

              {/* Hover Tint */}
              <motion.div 
                className={`absolute inset-0 ${category.hoverColor}`}
                animate={{ opacity: isHovered ? 0.7 : 0 }}
              />

              {/* Content Container */}
              <div className="relative z-10 px-8 md:px-12 flex flex-col justify-center h-full text-white">
                <div className="flex flex-col">
                  {/* Top Index/Subtitle */}
                  <div className="flex items-center gap-3 opacity-80 mb-1">
                    <Icon size={18} />
                    <span className="text-xs md:text-sm tracking-widest font-semibold uppercase">
                      {category.subtitle || "TEMPLATE"}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <motion.h2 
                    className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight drop-shadow-md"
                  >
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
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/${unitParam}/${category.id}`);
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
