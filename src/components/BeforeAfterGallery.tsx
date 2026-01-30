import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
// Before/After roofing images
import before1 from "@/assets/before-after-1.jpg";
import after1 from "@/assets/portfolio/residential-tile-roof.jpg";
import before2 from "@/assets/process/old-roof-removal.jpg";
import after2 from "@/assets/portfolio/villa-roof.jpg";
import before3 from "@/assets/process/roof-leak-damage.jpg";
import after3 from "@/assets/portfolio/apartment-building.jpg";

const transformations = [
  {
    id: 1,
    title: "Реконструкция на покрив с керемиди",
    location: "кв. Левски, Варна",
    beforeImage: before1,
    afterImage: after1,
    description: "Пълна подмяна на стари, повредени керемиди с нови"
  },
  {
    id: 2,
    title: "Обновяване на метален покрив",
    location: "Промишлена зона, Варна",
    beforeImage: before2,
    afterImage: after2,
    description: "Премахване на ръжда и монтаж на нов метален покрив"
  },
  {
    id: 3,
    title: "Хидроизолация на плосък покрив",
    location: "ж.к. Младост, Варна",
    beforeImage: before3,
    afterImage: after3,
    description: "Ремонт на пукнатини и нова хидроизолационна мембрана"
  }
];

const BeforeAfterGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setSliderPosition(50);
  };

  const current = transformations[currentIndex];

  return (
    <section id="before-after" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Преди & След
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Вижте трансформациите, които постигаме с нашите ремонти. Плъзнете плъзгача за сравнение.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Before/After Image Container */}
            <div className="relative aspect-[16/10] select-none">
              {/* After Image (Background) */}
              <img
                src={current.afterImage}
                alt={`${current.title} - След`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={current.beforeImage}
                  alt={`${current.title} - Преди`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: "none" }}
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <ChevronLeft className="w-4 h-4 text-primary-foreground -mr-1" />
                  <ChevronRight className="w-4 h-4 text-primary-foreground -ml-1" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Преди
              </div>
              <div className="absolute top-4 right-4 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                След
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>

            {/* Info Bar */}
            <div className="bg-card p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground">{current.title}</h3>
                  <p className="text-muted-foreground text-sm">{current.description}</p>
                  <div className="flex items-center gap-1 text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{current.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {currentIndex + 1} / {transformations.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            {transformations.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`relative w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-muted scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
