import { Box } from "@mui/material";

export interface HeaderDesktopProps {}

export function HeaderDesktop (props: HeaderDesktopProps) {
    return (
        <Box  display={{xs: 'none', lg: 'block'}}>
            Header Desktop
        </Box>
    )
}