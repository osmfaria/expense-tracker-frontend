'use client'

import { useMediaQuery, useTheme } from '@mui/material'

const ResponsiveSize = () => {
  const theme = useTheme()
  const size = useMediaQuery(theme.breakpoints.down('sm')) ? 'small' : 'medium'

  return size
}

export default ResponsiveSize
