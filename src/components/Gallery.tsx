import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    image: project1,
    title: "Жилищна Сграда",
    description: "Пълна реконструкция на покрив"
  },
  {
    image: project2,
    title: "Търговски Обект",
    description: "Монтаж на метален покрив"
  },
  {
    image: project3,
    title: "Къща",
    description: "Ремонт и хидроизолация"
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Нашите Проекти
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Галерия от някои от нашите успешно завършени проекти
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary-foreground/90">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
