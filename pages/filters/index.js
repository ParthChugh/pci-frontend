import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import styles from 'styles/header.module.scss'
import { withSnackbar } from 'notistack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import { Box, Typography, Radio, Button } from '@mui/material';
import { useState } from 'react';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked, disabled }) => ({
    '.MuiFormControlLabel-label': {
      fontFamily: 'Montserrat',
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: '17px',
      color: theme.palette.neutralDark.main_600,
    },
    '.Mui-disabled': disabled && {
      fontFamily: 'Montserrat',
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: '17px'
    },
    // '.MuiTypography-root': {
    //   fontFamily: 'Montserrat',
    //   fontStyle: "normal",
    //   fontWeight: 600,
    //   fontSize: "12px",
    //   lineHeight: '12px',
    //   color: theme.palette.primary.main_600
    // }
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <Box>
      <StyledFormControlLabel checked={checked} {...props} disabled={props.disabled} />
      <Typography className={styles["error-message"]}>{props.errorMessage}</Typography>
    </Box>
  )
}

const Filters = (props) => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [minimumValue, setMinimumValue] = useState('')
  const field = {
    name: "Urutkan Produk",
    id: "urutkan-produk",
    defaultValue: "",
    options: [
      {
        label: "Produk Terbaru",
        value: "produk-terbaru",
      },
      {
        label: "Harga Termurah",
        value: "harga-termurah",
      },
      {
        label: "Harga Termahal",
        value: "harga-termahal",
      },
      {
        label: "Produk Terpopuler",
        value: "produk-terpopuler",
      },
    ]
  }
  const fieldMinimum = {
    name: "Batas Harga",
    id: "batas-harga",
    defaultValue: "",
    options: [
      {
        label: "Minimum",
        value: "minimum",
      },
      {
        label: "Maksimum",
        value: "maksimum",
      },
    ]
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography className={styles["label-login"]}>{`${field.name}${field.required ? "*" : ''}`}</Typography>
      <Box>
        <RadioGroup
          name={field.name}
          defaultValue={field.defaultValue}
          className="ml-2"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        >
          {field.options.map((option, index) => (
            <MyFormControlLabel
              key={`form-data-label-${index}`}
              value={option.value}
              control={<Radio color={'secondary'} />}
              label={option.label}
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                width: "100%",
              }}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              disabled={option.disabled}
              errorMessage={option.errorMessage} />
          ))}
        </RadioGroup>
      </Box>
      <Typography className={styles["label-login"]}>{`${fieldMinimum.name}${fieldMinimum.required ? "*" : ''}`}</Typography>
      <Box className='d-flex justify-content-between mt-4'>
        {fieldMinimum.options.map((option, index) => (
          <IconButton className={`ml-2  ${styles["filter-button-type"]}`}
            onClick={() => {
              setMinimumValue(option.value)
            }}
            key={`option-minimum-${index}`}
          >
            <Typography className={`${styles["filter-text"]} ml-2`}>{option.label}</Typography>
          </IconButton>
        ))}
      </Box>
      <Button
        onClick={() => {
          if (value !== '' || minimumValue !== '') {
            let queryParams = {}
            if (value) {
              queryParams[field.id] = value
            }
            if (minimumValue) {
              queryParams[fieldMinimum.id] = minimumValue
            }
            router.push({
              pathname: router.query.redirect,
              query: queryParams
            })
          }
        }}
        fullWidth
        className={'button-button'}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Tampilkan Semua
      </Button>
    </Container>

  )
}

export async function getServerSideProps(appContext) {
  const { locale, query } = appContext
  // console.log("req.cookies.userData12312", req.cookies.userData)
  if (!query.redirect) {
    // console.log('-awdwadwdawdwa')
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  } else {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    }
  }
}
export default withSnackbar(Filters)