import { Box } from '@mui/material'
import * as React from 'react'
import { HeaderMobile } from './header-mobile'
import { HeaderDesktop } from './header-desktop'

export function Header() {
	console.log('render header')

	return 
    <>
    <HeaderMobile />
    <HeaderDesktop />
    </>
}
