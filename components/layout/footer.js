import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from 'styles/footer.module.scss'
import { Grid } from '@mui/material';

export default function Footer({ footer }) {
  return (
    <div className={`${styles["footer-root"]}`} style={{ marginBottom: 30 }}>
      <div className={"main-content"} style={{justifyContent: 'center'}}>
        <div>
          <div style={{ marginLeft: 20, marginRight: 20 }} className="d-flex justify-content-between align-items-start">
            <div className='align-items-start'>
              <Image src="/icons/logo.svg" alt="Vercel Logo" width={64} height={64} />
              <div className='d-flex'>
                <div>
                  <div className={clsx('mr-3', styles["soical-icons"])}>
                    <Image src="/social/mail.svg" alt="Mail" width={24} height={24} />
                  </div>
                  <div className={clsx('mr-3', styles["soical-icons"])}>
                    <Image src="/social/instagram.svg" alt="Instatram" width={24} height={24} />
                  </div>
                </div>
                <div>
                  <div className={clsx('mr-3', styles["soical-icons"])}>
                    <Image src="/social/whatsapp.svg" alt="Whatsapp" width={24} height={24} />
                  </div>
                  <div className={clsx('mr-3', styles["soical-icons"])}>
                    <Image src="/social/linkedin.svg" alt="Twitter" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
            {footer?.map((type, index) => {
              return (
                <div style={{marginRight: 5}}>
                  <Typography className={styles["footer-block-title"]}>{type.title}</Typography>
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
                </div>
              )
            })}

          </div>
        </div>

      </div>
    </div >

  )
}
