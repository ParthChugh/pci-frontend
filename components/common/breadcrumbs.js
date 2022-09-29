import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import breadcrumbStyles from 'styles/breadcrumb.module.scss'

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({ items }) {
  console.log('items21321', items)
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" className='d-flex align-items-start'>
        {(items.filter((_, index) => index < items.length - 1)).map(breadcrumb => (
          <Link underline="hover" color="inherit" href={breadcrumb.href} className={breadcrumbStyles.breadcrumb}>
            {breadcrumb.name}
          </Link>
        ))}
        <Typography className={breadcrumbStyles.breadcrumb} color="text.primary">{(items[items.length - 1]).name}</Typography>
      </Breadcrumbs>
    </div>
  );
}