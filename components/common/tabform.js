
import styles from 'styles/header.module.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function TabForm(props) {
  const { form, buttonText, handleSubmit, preButton = <div />, postButton = <div /> } = props;
  const formFields = Object.values(form)
  const theme = useTheme();
  return (
    <div className={styles.container}>
      <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {formFields.map((field, index) => {
            return (
              <Grid item xs={12} key={index}>
                <label className={styles["label-login"]}>{`${field.label}${field.required && "*"}`}</label>
                <TextField
                  {...field}
                  label={""}
                  autoFocus={index === 0}
                  style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
                />
              </Grid>
            )
          })}
        </Grid>
        {preButton}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonText}
        </Button>
        {postButton}
      </Box>
    </div>
  )
}

