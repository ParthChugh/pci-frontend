import React from 'react';
import { Box, Typography } from '@mui/material';

import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import styles from 'styles/header.module.scss'

const PicDetails = (props) => {
  return (
    <Box className="mt-4" >
      {(props?.pics || []).map((pic) => (
        <Box key={`pics-${pic.id}`} className={"d-flex flex-wrap align-items-start"} style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, cursor: 'pointer' }} onClick={() => {
          router.push(`delivery-schedule/add-pic/${pic.id}`)
        }} >
          {Object.values(props?.pic?.form || {}).map((field, index) => {
            return (
              <Box key={`pic-${index}`} style={{ width: '45%' }} className="mb-3">
                <Typography className={styles['pic-label']}>
                  {field.name}
                </Typography>
                <Typography className={styles['subtotal']}>
                  {pic[field.id]}
                </Typography>
              </Box>
            )
          })}
          <IconButton
            className="ml-2"

            style={{ height: 16, width: 16 }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      )
      )}
    </Box>
  )
}

export default PicDetails