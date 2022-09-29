import { Typography, Box, Link } from "@mui/material";
import Image from "next/image";
import styles from 'styles/header.module.scss'

const TitleSeeMore = ({ heading, readMoreText, href }) => {
  return (
    <Box className="container d-flex justify-content-between">
      <Typography className={styles['page-sub-heading']} variant={"h3"}>
        {heading}
      </Typography>
      {readMoreText &&
        <Link className="d-flex align-items-center" style={{ textDecoration: 'none' }} href={href}>
          <Typography className={styles['read-more']} color="primary" variant={"h3"}>
            {readMoreText}
          </Typography>
          <Image src="/icons/right-arrow.svg" alt="See All" width={12} height={12} />
        </Link>
      }
    </Box>
  );
};

export default TitleSeeMore