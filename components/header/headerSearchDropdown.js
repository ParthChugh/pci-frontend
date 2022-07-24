
import PropTypes from 'prop-types'
import styles from 'styles/search.module.scss'

const HeaderSearchDropdown = (props) => {
  const {
    display,
  } = props
  return (
    <div ref={props.headerRef}>
      <div
        id="search-suggestions"
        className="search-suggestions"
        style={{ display: `${display}` }}
      >
        <div className={styles["header-dropdown"]}>
          <span>asdasdsad</span>
        </div>
      </div>
    </div >
  )
}

HeaderSearchDropdown.propTypes = {
  display: PropTypes.string,
  isSearchTyped: PropTypes.string,
}

export default HeaderSearchDropdown
