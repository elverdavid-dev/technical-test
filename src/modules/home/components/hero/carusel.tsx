'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import type { Movie } from '@/modules/core/types/movie'
import { baseUrlImage } from '@/modules/core/utils/config'
import MovieInfoHero from '@/modules/home/components/hero/movie-info-hero'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper/modules'

interface Props {
	movies: Movie[] | undefined
}

const Carusel = ({ movies }: Props) => {
	return (
		<Swiper
			modules={[Autoplay, Pagination]}
			pagination={{ clickable: true, dynamicBullets: true }}
			autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
			loop={true}
			aria-label="Trending movies carousel"
		>
			{movies?.map((movie) => (
				<SwiperSlide key={movie.id} className="relative">
					<Link href={`/movie/${movie.id}`}>
						<img
							src={`${baseUrlImage}/${movie.backdrop_path}`}
							alt={movie.original_title}
							height={150}
							className="h-[569px] w-full object-cover"
						/>

						{/* Black gradient overlay for better text readability */}
						<div
							className="absolute inset-0 bg-gradient-to-t via-black/50 from-black  to-transparent z-10"
							aria-hidden="true"
						/>
					</Link>
					<MovieInfoHero movie={movie} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default Carusel
