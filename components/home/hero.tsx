import { Box, Button, Container, Stack, Typography } from '@mui/material'
import * as React from 'react'
import Image from 'next/image'

export function HeroSection() {
	return (
		<Box component="section">
			<Container>
				<Stack direction="row" alignItems="flex-start">
					<Box>
						<Typography>
							Hi, I am John, <br /> Creative Technologist
						</Typography>
						<Typography>
							Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
							officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
							amet.
						</Typography>
						<Button variant="contained">Download Resume</Button>
					</Box>
					<Box></Box>
				</Stack>
			</Container>
		</Box>
	)
}
