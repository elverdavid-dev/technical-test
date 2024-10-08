'use client'
import Logo from '@/modules/shared/components/common/logo'
import SearchInput from '@/modules/shared/components/layouts/header/search-input'
import SearchInputPlaceholder from '@/modules/shared/components/layouts/header/search-input-placeholder'
import UserButtonWrapper from '@/modules/shared/components/layouts/header/user-button-wrapper'
import ThemeToggle from '@/modules/shared/components/theme/theme-toggle'
import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton,
	SignedIn,
	SignedOut,
} from '@clerk/nextjs'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Spinner,
	cn,
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'

const Navbar2 = () => {
	//Hooks
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathName = usePathname()

	const navLinks = [
		{ name: 'Popular', path: '/popular' },
		{ name: 'Now Playing', path: '/now-playing' },
		{ name: 'Upcoming', path: '/upcoming' },
		{ name: 'Top Rated', path: '/top-rated' },
	]

	const handleSearchAndCloseMenu = () => {
		setIsMenuOpen(false)
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			setIsMenuOpen(!isMenuOpen)
		}
	}
	return (
		<Navbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			maxWidth="full"
		>
			<NavbarContent justify="center">
				<NavbarBrand>
					<Logo />
				</NavbarBrand>
			</NavbarContent>

			{/* Desktop navbar items */}
			<NavbarContent className="hidden lg:flex" justify="start">
				{navLinks.map(({ name, path }) => (
					<NavbarItem key={`menuItem-${name}`} isActive={pathName === path}>
						<Link
							href={path}
							className={cn(
								'text-lg md:text-base dark:text-gray-300 hover:text-[#F0B90B] transition-all',
								pathName === path && 'text-[#F0B90B] hover:text-[#F0B90B]',
							)}
						>
							{name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			{/* Searh,ThemeToggle,SignButton */}
			<NavbarContent
				as="div"
				className="items-center flex pl-16 lg:pl-0"
				justify="end"
			>
				{/* Search input */}
				<NavbarItem className="hidden lg:flex">
					<Suspense fallback={<SearchInputPlaceholder />}>
						<SearchInput onKeyDown={() => handleKeyDown} />
					</Suspense>
				</NavbarItem>
				{/* Theme toggle */}
				<NavbarItem className='pl-10'>
					<ThemeToggle />
				</NavbarItem>

				{/* Auth buttons */}
				<NavbarItem>
					<ClerkLoading>
						<Spinner size="sm" color="default" />
					</ClerkLoading>
					<ClerkLoaded>
						<SignedOut>
							<SignInButton mode="modal" />
						</SignedOut>
						<SignedIn>
							<UserButtonWrapper />
						</SignedIn>
					</ClerkLoaded>
				</NavbarItem>
			</NavbarContent>

			{/* Toggle mobile*/}
			<NavbarContent className="lg:hidden" justify="end">
				<NavbarMenuToggle
					className="dark:text-white"
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>

			{/* Mobile navbar items */}
			<NavbarMenu className="dark:bg-black pt-5 flex flex-col gap-y-5 items-center z-50">
				<Suspense fallback={<SearchInputPlaceholder />}>
					<SearchInput />
				</Suspense>
				{navLinks.map(({ name, path }) => (
					<NavbarMenuItem key={`menuItem-${name}`}>
						<Link
							href={path}
							onClick={handleSearchAndCloseMenu}
							className="dark:text-gray-300 text-lg md:text-base"
						>
							{name}
						</Link>
					</NavbarMenuItem>
				))}
				{/* 	<SignInButton /> */}
			</NavbarMenu>
		</Navbar>
	)
}

export default Navbar2
