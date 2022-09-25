import { useState, useContext } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss';
import Tabform from 'components/common/tabform';
import { useTranslation } from 'next-i18next';
import { withSnackbar } from 'notistack';
import Button from '@mui/material/Button';
// import { UserContext } from 'context/users/reducer';
// import * as UserActions from 'context/users/actions'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

function BusinessVerfication(props) {
  const [selectedTab, setSelectedTab] = useState(0)
  // const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  // const {
  //   userState,
  //   userDispatch,
  // } = useContext(UserContext);

  const steps = props?.tabs?.map(tab => tab.heading)
  const handleSubmitForm = async (values) => {
    const params = new URLSearchParams();
    Object.keys(values).forEach((key) => {
      params.append(key, values[key]);
    })
    console.log('dwqq123231', values)
    // axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/website/company/file?${props?.tabs[selectedTab].extraFields.apiQuery}`, params)
    //   .then((response) => {
    //     console.log("response12321", response)
    //     props.enqueueSnackbar("Business Details Updated")
    //     userDispatch(UserActions.updateBusinessDetails(response.data.data))
    //     Cookies.set('businessDetails', JSON.stringify(response.data.data), { expires: new Date(response.data.data.accessTokenExpiry) })
    //     router.push(props?.tabs?.[selectedTab]?.extraFields?.redirect || '/')
    //   })
    //   .catch((error) => {
    //     props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
    // });
    if (selectedTab !== props?.tabs?.length - 1) {
      setSelectedTab(selectedTab + 1)
      Cookies.set('selectedTab', selectedTab + 1)
    }

  };

  const changeTab = (value) => {
    setSelectedTab(value)
    Cookies.set('selectedTab', value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className='d-flex flex-row align-items-center justify-content-between'>
        {selectedTab !== 0 ?
          <Button
            onClick={() => {
              setSelectedTab((prevActiveStep) => prevActiveStep - 1);
            }}
          // sx={{ mt: 1, mr: 1 }}
          >
            Kembali
          </Button> : <div />
        }
        <Typography component="h1" variant="h5" className={styles['page-heading']}>
          {t('register-your-busniess')}
        </Typography>
      </div>

      <BasicTabs
        tabType={props.tabType}
        tabs={(props?.tabs || []).map(tab => ({
          heading: tab.heading,
          disabledClick: tab.clickDisabled,
          component: (
            <Tabform
              keyPrefix={"registerParent"}
              form={tab.form}
              buttonText={tab.button}
              handleSubmitForm={handleSubmitForm}
              preButton={
                <div />
              }
            />
          )
        }))}
        changeTab={changeTab}
        selectedTab={selectedTab}
      />
    </Container>
  );
}

export async function getServerSideProps({ locale, req }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/business-verfication`)
  const data = await response.json()
  if (req.cookies.businessDetails && req.cookies.userDate) {
    return {
      redirect: {
        permanent: false,
        destination: data?.tabs?.[req.cookies.selectedTab || 0]?.extraFields?.redirect || '/'
      }
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      tabs: data.tabs || [],
      tabType: data.tabType || [],
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(BusinessVerfication)