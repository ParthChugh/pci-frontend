import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabform from 'components/common/tabform';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'


function SignIn(props) {
  const { form } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <Typography component="h1" variant="h5" className={styles['page-heading']}>
          Masuk
        </Typography>
        <Tabform
          form={form.form}
          buttonText={form.button}
          handleSubmit={handleSubmit}
          preButton={<Grid container alignItems="center">
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color={"secondary"} />}
                label="Ingat saya"
              />
            </Grid>
            <Grid item>
              <Link href="/reset-password/" variant="body2">
                Lupa password?
              </Link>
            </Grid>
          </Grid>}
          postButton={<Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>}
        />
      </Box>
    </Container>

  );
}
export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`)
  const data = await response.json()
  console.log("data12321", data)
  return {
    props: {
      form: data || [],
    }, // will be passed to the page component as props

  }
}
export default SignIn