import { LayoutProps } from '@/models/index'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Box, Container, Stack } from '@mui/material'
import { Footer } from '../common'
import { Header } from '../common/header'

export function MainLayout({ children }: LayoutProps) {
	useEffect(() => {
		console.log('MainLayout mounting')

		return () => console.log('MainLayout unmounting')
	}, [])

	return (
		<Stack minHeight="100vh">
			<Header />
			
			<Box component="main" flexGrow={1}>
				<Container maxWidth="sm" sx={{bgcolor: 'primary.main'}}>
					SM CONTAINER
				</Container>
				<Container sx={{bgcolor: 'primary.main'}}>MD CONTAINER</Container>
			<Link href="/">
				<a>Home</a>
			</Link>

			<Link href="/blog">
				<a>Blog</a>
			</Link>

			<Link href="/works">
				<a>Works</a>
			</Link>
			{children}
			</Box>

			<Footer />
		</Stack>
	)
}
