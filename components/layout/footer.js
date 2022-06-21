import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import Button from '@mui/material/Button';
import styles from 'styles/footer.module.scss'

export default function Footer({ footer }) {
  return (
    <div className={styles["footer-root"]}>
      <div className={styles["footer-menu-row"]}>
        <>
          <ul className='d-flex flex-column'>
            <li className={`${styles["heading-footer"]} ${styles["margin-heading-main"]}`}>{"Join the community"}</li>
            <div className='d-flex'>
              <Image src="/social/facebook.svg" alt="Facebook" width={64} height={64} />
              <Image src="/social/instagram.svg" alt="Instatram" width={64} height={64} />
              <Image src="/social/discord.svg" alt="Discord" width={64} height={64} />
              <Image src="/social/twitter.svg" alt="Twitter" width={64} height={64} />
              <Image src="/social/youtube.svg" alt="Youtube" width={64} height={64} />
            </div>

            <div>
              <Image src="/icons/logo.svg" alt="Vercel Logo" width={64} height={64} />
              <li className={`${styles["heading-footer"]} mt-2`}>{"OpenThrone"}</li>
              <li className={styles["sub-heading-footer"]}>{"The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items."}</li>
            </div>

          </ul>
        </>
        <div>
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

  )
}
