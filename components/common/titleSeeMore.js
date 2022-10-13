import { Typography, Box, Link, NoSsr } from "@mui/material";
import Image from "next/image";
import styles from 'styles/header.module.scss'

const TitleSeeMore = ({ heading, readMoreText, href, showPlus = false, hideArrow = false }) => {
  const ShowPlus = () => {
    return (
      <Typography className={`mr-1`} color="primary">
        +
      </Typography>
    )
  }
  return (
    <NoSsr>
      <Box className="container d-flex justify-content-between">
        <Typography className={styles['page-sub-heading']} variant={"h3"}>
          {heading}
        </Typography>
        {readMoreText &&
          <Link className="d-flex align-items-center" style={{ textDecoration: 'none' }} href={href}>

            <Typography className={`${styles['read-more']} d-flex align-items-center`} color="primary" variant={"h3"}>
              {showPlus && ShowPlus()}{readMoreText}
            </Typography>
            {!hideArrow && <Image src="/icons/right-arrow.svg" alt="See All" width={12} height={12} />}

          </Link>
        }
      </Box>
    </NoSsr>

  );
};

export default TitleSeeMore