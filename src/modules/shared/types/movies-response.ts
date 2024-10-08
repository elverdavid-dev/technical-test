import type { Movie } from '@/modules/shared/types/movie'

export interface MoviesResponse {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}
