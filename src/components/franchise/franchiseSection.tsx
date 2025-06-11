export function FranchiseSection() {
    const franchises = [
      { name: "Walt Disney", logo: "https://logos-world.net/wp-content/uploads/2020/05/Walt-Disney-Pictures-Emblem.jpg", bg: "bg-[#243783]" },
      { name: "Marvel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Marvel_Studios_logo.svg/2560px-Marvel_Studios_logo.svg.png", bg: "bg-[#D50010]" },
      { name: "DC", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU-MZ_dMhipW1psgrNJYFkGOkXBcnEvsL3tg&s", bg: "bg-[#0476F1]" },
      { name: "Star Wars", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png", bg: "bg-black" },
    ]
  
    return (
      <section className="bg-[#000000] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {franchises.map((franchise) => (
              <div
                key={franchise.name}
                className={`${franchise.bg} rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <img
                  src={franchise.logo || "/placeholder.svg"}
                  alt={franchise.name}
                  className="max-w-[80%] max-h-[60%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  