import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Image from 'next/image'
import { useRouter } from "next/router";


function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);
  const actionClasses = props.classes;
  const router = useRouter();
  React.useEffect(() => {
    if (value === 0) {
      router.push('/')
    } else if (value === 1) {
      router.push('/products')
    } else if (value === 2) {
      router.push('/wallet')
    } else {
      router.push('/profile')
    }
  }, [value])
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3} id="__next">

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction classes={actionClasses} label="Home" icon={value === 0 ? <Image src="/icons/home-focused.svg" alt="home" width={20} height={20} /> : <Image src="/icons/home.svg" alt="home" width={20} height={20} />} />
        <BottomNavigationAction classes={actionClasses} label="Produk" icon={value === 1 ? <Image src="/icons/products-focused.svg" alt="home" width={20} height={20} /> : <Image src="/icons/products.svg" alt="products" width={20} height={20} />} />
        <BottomNavigationAction classes={actionClasses} label="Transaksi" icon={value === 2 ? <Image src="/icons/wallet-focused.svg" alt="home" width={20} height={20} /> : <Image src="/icons/wallet.svg" alt="wallet" width={20} height={20} />} />
        <BottomNavigationAction classes={actionClasses} label="Profile" icon={value === 3 ? <Image src="/icons/profile-focused.svg" alt="home" width={20} height={20} /> : <Image src="/icons/profile.svg" alt="profile" width={20} height={20} />} />
      </BottomNavigation>
    </Paper>
  );
}
export default SimpleBottomNavigation
