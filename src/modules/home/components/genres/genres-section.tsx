import Subtitle from "@/modules/core/components/common/subtitle"
import { getGenres } from "@/modules/home/services/get-genres"

const GenresSection = async () => {
  const genresData = await getGenres()
  console.log(genresData)
  return (
    <section className="mt-16 container mx-auto">
      <Subtitle text="Genres" />
      <div className="flex items-start gap-x-4 overflow-x-auto scrollbar-hide scroll-smooth">
        {
          genresData?.genres.map(({ id, name }) => (
            <span key={id} className="flex-shrink-0 text-gray-800 hover:text-white hover:bg-black transition-all py-2 px-5 rounded-full">
              {name}
            </span>
          ))
        }
      </div>
    </section>
  )
}

export default GenresSection