'use client'

import { Check, Delete } from '@mui/icons-material'
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'

const DeleteButton = ({ handleDelete }) => {
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
          <Tooltip title='Confirm | Delete'>
            <IconButton onClick={handleConfirmation} size='small' color='error'>
              <Check />
            </IconButton>
          </Tooltip>
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
