import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import styles from 'styles/header.module.scss'
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function FilterLocation(props) {
  const router = useRouter()
  return (
    <Box className='d-flex justify-content-between'>
      <IconButton aria-label="delete" className={`ml-2 ${styles["filter-button-type"]}`}
        onClick={() => {
          router.push({
            pathname: '/filters',
            query: { redirect: router.pathname },
          })
        }}>
        <Image src="/icons/filter-home.svg" alt="filter" width={24} height={24} />
        <Typography className={`${styles["filter-text"]} ml-2`}>Filter</Typography>
      </IconButton>
      <IconButton aria-label="delete" className={`ml-2 ${styles["filter-button-type"]}`}>
        <Image src="/icons/location.svg" alt="filter" width={24} height={24} />
        <Typography className={`${styles["filter-text"]} ml-2`}>Lokasi</Typography>
      </IconButton>
    </Box>
  )
}