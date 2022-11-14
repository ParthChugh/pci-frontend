import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from 'styles/footer.module.scss'
import { Grid, Container } from '@mui/material';

export default function Footer({ footer }) {
  const socmed = [
    {
      src: "/icons/mail.png",
      title: "Email",
      content: "hello@brik.id"
    },
    {
      src: "/icons/whatsapp.png",
      title: "Whatsapp",
      content: "+62 882-00000-1001"
    },
    {
      src: "/icons/instagram.png",
      title: "Instagram",
      content: "@brik.id"
    },
    {
      src: "/icons/Linkedin.png",
      title: "LinkedIn",
      content: "@BRIK Construction"
    },
  ]
  
  return (
    <Grid container>
      <Grid item sm={4} sx={{ marginBottom: { xs: 5}}}>
        <Link href="/" passHref>
          <a>
            <Image src="/icons/logo-v4.png" alt="BRIK Logo" width={86} height={42} style={{ cursor: "pointer" }} />
          </a>
        </Link>
        <div className={styles['container-socmed']}>
          {
            socmed.map(el => (
              <Socmed {...el} key={el.title} />
            ))
          }
        </div>
      </Grid>

      {footer?.map((type, index) => {
        return (
          <Grid item xs={6} sm={4} key={index}>
            <Typography fontWeight="bold" >{type.title}</Typography>
            {type.items.map((element, elindex) => {
              return (
                <ul className={styles["footer-menu-list"]} key={`footer-element-${elindex}`}>
                  <li className={styles["footer-menu-item"]}>
                    <Link
                      href={element.href}
                      className={[styles["footer-menu-link"], styles["link"]]}
                    >
                      {element.title}
                    </Link>
                  </li>
                </ul>
              )
            })}
          </Grid>
        )
      })}

      <Grid item xs={12} className={styles['border-line']} />
      <Grid item xs={12} className={styles['copyright-footer']}>
        @2022 BRIK Construction, All Rights Reserved
      </Grid>
    </Grid >
  )
}

const Socmed = (props) => {
  const { src, title, content } = props;
  return (
    <div className={clsx('mr-3', styles["social-section"])}>
      <img src={src} alt="Mail" width={32} height={32} />
      <div>
        <Typography>{title}</Typography>
        <Typography fontWeight="bold">{content}</Typography>
      </div>
    </div>
  )
}