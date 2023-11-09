import React from 'react'
import noExpenses from '../../public/no-expenses.svg'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const NoData = () => {
  return (
    <Box>
      <Stack gap={0} alignItems='center'>
        <Image src={noExpenses} height={240} width={320} alt='no wait' />
        <Typography fontSize='1rem' color='GrayText'>
          No expenses found...
        </Typography>
      </Stack>
    </Box>
  )
}

export default NoData
