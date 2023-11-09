'use client'

import { Delete } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'

const DeleteButton = ({ handleDelete, isLoading }) => {
  const [open, setOpen] = useState()

  const handleConfirmation = async () => {
    await handleDelete()
    setOpen((prev) => !prev)
  }

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      {open ? (
        <ClickAwayListener onClickAway={handleClick}>
          <LoadingButton
            variant='text'
            color='error'
            loading={isLoading}
            loadingPosition='center'
            onClick={handleConfirmation}
            size='small'
            sx={{ height: '34px' }}
          >
            confirm
          </LoadingButton>
        </ClickAwayListener>
      ) : (
        <Tooltip title='Remove'>
          <IconButton onClick={handleClick} size='small'>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

export default DeleteButton
