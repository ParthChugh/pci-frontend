
import styles from 'styles/Home.module.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function TabForm({ form, buttonText, handleSubmit }) {
  const formFields = Object.values(form)
  console.log("formFields123213", formFields)
  return (
    <div className={styles.container}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {formFields.map((field, index) => {
            console.log('field12312', field)
            return (
              <Grid item xs={12} key={index}>
                <TextField
                  {...field}
                  autoFocus={index===0}
                />
              </Grid>
            )
          })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonText}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

