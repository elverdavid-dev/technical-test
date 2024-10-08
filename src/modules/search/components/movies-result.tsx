import FilterSection from '@/modules/search/components/filter/filter-section'
import NotFoundSeach from '@/modules/search/components/not-found-search'
import { searchMovies } from '@/modules/search/services/search-movie'
import MobileCard from '@/modules/shared/components/card/mobile-card'
import MovieCard from '@/modules/shared/components/card/movie-card'
import BackButton from '@/modules/shared/components/common/back-button'
import PaginationWrapper from '@/modules/shared/components/common/pagination-wrapper'
import { formatNumber } from '@/modules/shared/utils/format-number'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
	query: string
	page: number
	type: string
}

const MoviesResult = async ({ query, page, type }: Props) => {
	const movies = await searchMovies(query, page, type)
	// Check if the requested page is greater than the total pages
	if (page > (movies?.total_pages ?? 1)) {
		// Redirect to 404 not found page
		notFound()
	}

	return (
		<section className="px-2 md:px-0  md:container md:mx-auto min-h-screen">
			<div className="flex items-center justify-between ">
				<BackButton path="/" label="Search" />
				<span className="md:pr-5">
					<strong>{formatNumber(movies?.total_results)}</strong> Total movies
				</span>
			</div>
			<FilterSection />
			<section className="mt-5 mx-2 lg:mx-3">
				{movies?.total_results === 0 ? (
					<NotFoundSeach />
				) : (
					<section className="flex flex-col gap-y-5 md:grid md:grid-cols-5 md:gap-y-10 lg:grid-cols-8 mt-5">
						{movies?.results.map(
							({
								id,
								title,
								poster_path,
								release_date,
								vote_average,
								overview,
								name,
								first_air_date
							}) => (
								<Link key={id} href={`/${type}/${id}`}>
									{/* Mobile Section */}
									<div className="md:hidden">
										<MobileCard
											title={title ?? name}
											poster_path={poster_path}
											release_date={release_date ?? first_air_date}
											vote_average={vote_average}
											overview={overview}
										/>
									</div>

									{/* Desktop section */}
									<div className="hidden md:block">
										<MovieCard
											title={title ?? name}
											poster_path={poster_path}
											release_date={release_date ?? first_air_date}
											vote_average={vote_average}
										/>
									</div>
								</Link>
							),
						)}
					</section>
				)}
			</section>
			<PaginationWrapper
				total={movies?.total_pages ?? 0}
				initialPage={1}
				page={page}
			/>
		</section>
	)
}

export default MoviesResult
