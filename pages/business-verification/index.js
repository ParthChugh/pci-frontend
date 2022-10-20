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
import { UserContext } from 'context/users/reducer';
import * as UserActions from 'context/users/actions'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
// import { getBase64 } from 'helpers/global'

// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

const getBase64 = (file) => {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      // console.log("Called", reader);
      baseURL = reader.result;
      // console.log('baseURL=-------', baseURL);
      resolve(baseURL);
    };
    // console.log(fileInfo);
  });
};


function BusinessVerfication(props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const userData = getUserDetails()
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  // console.log("userData.accessToken", userData.accessToken)
  const handleSubmitForm = async (values) => {
    const params = new URLSearchParams();
    // Object.keys(values).forEach((key) => {
    //   params.append(key, values[key]);
    // })
    // console.log("values.Files[0].name", values.images[0].name)
    params.append("number", values.number);
    const base64Url = await getBase64(values.images[0])
    // console.log('base64Url12312321---', base64Url)
    params.append("images", base64Url)

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/company/file?${props?.tabs[selectedTab].extraFields.apiQuery}`, params, {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      withCredentials: true
    })
      .then((response) => {
        // console.log("response12321", response)
        props.enqueueSnackbar(response.data.message)
      })
      .catch((error) => {
        
        props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
      });

    if (selectedTab !== props?.tabs?.length - 1) {
      setSelectedTab(selectedTab + 1)
      Cookies.set('selectedTab', selectedTab + 1)
    } else {
      router.replace('/')
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
  // if (req.cookies.businessDetails && req.cookies.userData) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: data?.tabs?.[req.cookies.selectedTab || 0]?.extraFields?.redirect || '/'
  //     }
  //   }
  // }
  if (!req.cookies.userData) {
    return {
      redirect: {
        permanent: false,
        destination: '/register'
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