import { useState, useContext } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss';
import Tabform from 'components/common/tabform';
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { withSnackbar } from 'notistack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserContext } from 'context/users/reducer';
import * as UserActions from 'context/users/actions'
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

function SignUp(props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const router = useRouter();
  const {
    userDispatch,
  } = useContext(UserContext);
  const handleSubmitForm = async (values) => {
    userDispatch(UserActions.setLoading(true))
    const params = new URLSearchParams();
    Object.keys(values).forEach((key) => {
      params.append(key, values[key]);
    })

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/auth/register?${props?.tabs[selectedTab].extraFields.apiQuery}`, params)
      .then((response) => {
        props.enqueueSnackbar("Registration Successfull")
        console.log("response.data.data", response.data)
        if(Object.values(response.data|| {}).length > 0) {
          userDispatch(UserActions.updateUserDetails(response.data.data))
          Cookies.set('userData', JSON.stringify(response.data.data), { expires: new Date(response.data.data.accessTokenExpiry) })
        } 
        

        router.push(props?.tabs?.[selectedTab]?.extraFields?.redirect || '/')
        userDispatch(UserActions.setLoading(false))
      })
      .catch((error) => {
        props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
        userDispatch(UserActions.setLoading(false))
      });;
  };

  const changeTab = (value) => {
    setSelectedTab(value)
    Cookies.set('selectedTab', value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" className={styles['page-heading']}>
        {t('register')}
      </Typography>
      <Typography component="h1" variant="h5" className={styles['page-sub-heading']}>
        {t('your-account-type')}
      </Typography>
      <BasicTabs
        tabType={props.tabType}
        tabs={(props?.tabs || []).map(tab => ({
          heading: tab.heading,
          component: (
            <Tabform
              keyPrefix={"registerParent"}
              form={tab.form}
              buttonText={tab.button}
              handleSubmitForm={handleSubmitForm}
              preButton={<div />}
            />
          )
        }))}
        changeTab={changeTab}
      />
    </Container>
  );
}

export async function getServerSideProps({ locale, req }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`)
  const data = await response.json()
  if (req.cookies.userData) {
    return {
      redirect: {
        permanent: false,
        destination: data?.tabs?.[req.cookies.selectedTab || 0]?.extraFields?.redirect
      }
    }
  } else {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        tabs: data.tabs || [],
        tabType: data.tabType || [],
      }, // will be passed to the page component as props

    }
  }

}
export default withSnackbar(SignUp)