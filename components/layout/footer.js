import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import clsx from 'clsx'
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from 'styles/footer.module.scss'

export default function Footer({ footer }) {
  return (
    <div className={styles["footer-root"]}>
      <div className={"main-content"}>
        <div className={styles["show-on-mobile"]}>
          <ul className='d-flex flex-column' >
            <li className={`${styles["heading-footer"]} ${styles["margin-heading-main"]}`}>{"Get the latest updates"}</li>
            <li className={styles["sub-heading-footer"]}>{"Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenThrone."}</li>
            <div className={`d-flex ${styles['subscribe-container']} flex-wrap`}>
              <TextField
                hiddenLabel
                // id="filled-hidden-label-normal"
                className={`${styles['field-footer-subscribee']}`}
                fullWidth
                placeholder="Enter your email address"
                variant="filled"
              />
              <Button variant="contained" component="span" className={`${styles['subscribe-botton']} mt-2`}>
                Sign Up
              </Button>
            </div>
          </ul>

          <div style={{ marginLeft: 20, marginRight: 20 }}>
            {footer?.map((type, index) => {
              return (
                <Accordion style={{ background: 'transparent' }} key={`accordion-${index}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    style={{ borderBottom: '1px solid white' }}
                    id={`panel1a-header-${index}`}
                  >
                    <Typography className={styles["footer-block-title"]}>{type.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </div>
        </div>
        <>
          <ul className='d-flex flex-column'>
            <li className={`${styles["heading-footer"]} ${styles["margin-heading-main"]}`}>{"Join the community"}</li>
            <div className='d-flex'>
              <div className={clsx('mr-3', styles["soical-icons"])}>
                <Image src="/social/facebook.svg" alt="Facebook" width={64} height={64} />
              </div>
              <div className={clsx('mr-3', styles["soical-icons"])}>
                <Image src="/social/instagram.svg" alt="Instatram" width={64} height={64} />
              </div>
              <div className={clsx('mr-3', styles["soical-icons"])}>
                <Image src="/social/discord.svg" alt="Discord" width={64} height={64} />
              </div>
              <div className={clsx('mr-3', styles["soical-icons"])}>
                <Image src="/social/twitter.svg" alt="Twitter" width={64} height={64} />
              </div>
              <div className={clsx('mr-3', styles["soical-icons"])}>
                <Image src="/social/youtube.svg" alt="Youtube" width={64} height={64} />
              </div>

            </div>

            <div>
              <div className='mt-4 mb-4'>
                <Image src="/icons/logo.svg" alt="Vercel Logo" width={64} height={64} />
              </div>

              <li className={`${styles["heading-footer"]} mt-2`}>{"OpenThrone"}</li>
              <li className={styles["sub-heading-footer"]}>{"The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items."}</li>
            </div>

          </ul>
        </>
        <div>
          <div className={styles["show-tablet-or-higher"]}>
            <ul className='d-flex flex-column' >
              <li className={`${styles["heading-footer"]} ${styles["margin-heading-main"]}`}>{"Get the latest updates"}</li>
              <li className={styles["sub-heading-footer"]}>{"Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenThrone."}</li>
              <div className={`d-flex ${styles['subscribe-container']}`}>
                <TextField
                  hiddenLabel
                  // id="filled-hidden-label-normal"
                  className={styles['field-footer-subscribee']}
                  fullWidth
                  placeholder="Enter your email address"
                  variant="filled"
                />
                <Button variant="contained" component="span" className={styles['subscribe-botton']}>
                  Sign Up
                </Button>
              </div>

            </ul>
            <ul className={`${styles["footer-menu-holder"]}`} data-cmp="footerAccordion">
              {footer?.map((type, index) => {
                return (
                  <li
                    key={`footer-${index}`}
                    className={"footer-menu-link"}
                    data-id="footer-menu-column-1-chat"
                  >
                    <Link
                      href="/help/customer-product-and-service-queries/hel00001/"
                    >
                      <span className={styles["footer-block-title"]}>{type.title}</span>
                    </Link>
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
                  </li>
                )
              })}
            </ul>
          </div>

        </div>
      </div>
    </div >

  )
}
