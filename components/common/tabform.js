
import { useCallback } from 'react';
import styles from 'styles/header.module.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import Box from '@mui/material/Box';

import Dropdown from 'components/common/dropdown'
import DropZone from "components/common/dropZone";
import { Typography } from '@mui/material';
import axios from 'axios';

export default function TabForm(props) {
  const { form, buttonText, handleSubmitForm, preButton = <div />, postButton = <div />, defaultValues = {} } = props;
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const { t } = useTranslation('common', { keyPrefix: props.keyPrefix });
  const formFields = Object.values(form)
  const theme = useTheme();
  const onSubmit = useCallback((values) => {
    handleSubmitForm(values)
    reset();
  }, []);
  const renderInput = ({ field, index }) => {
    return (
      <Grid item xs={12} key={index}>
        <label className={styles["label-login"]}>{`${t(field.name)}${field.required ? "*" : ""}`}</label>
        <Controller
          render={({ field: { name, value, onChange } }) => (
            <TextField
              {...field}
              name={name}
              value={value}
              onChange={onChange}
              // error={Boolean(errors[])}
              {...(field.pattern ? { inputProps: { pattern: field.pattern ? new RegExp(field.pattern, 'g') : "" } } : {})}
              autoFocus={index === 0}
              style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
            />
          )}
          control={control}
          name={field.id}
          defaultValue={defaultValues[field.id] || ''}
        // rules={{ required: field.required, pattern: field.pattern }}
        />
      </Grid>
    )
  }

  const renderDropdown = ({ field, index }) => {
    return (
      <Grid item xs={12} key={index}>
        <Typography className={styles["label-login"]}>{`${t(field.name)}${field.required ? "*" : ''}`}</Typography>
        <Controller
          render={({ field: { name, value, onChange } }) => (
            <Dropdown
              {...field}
              name={name}
              value={value}
              onChange={onChange}
              // error={Boolean(errors[])}
              {...(field.pattern ? { inputProps: { pattern: field.pattern ? new RegExp(field.pattern, 'g') : "" } } : {})}
              style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
            />
          )}
          control={control}
          name={field.id}
          defaultValue={defaultValues[field.id] || ''}
        />
      </Grid>
    )
  }


  const renderSearchDropdown = ({ field, index }) => {
    const loadOptions = async (inputValue) => {
      const dataResposne = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}${field.autoFill.api.replace("${text}", inputValue)}`)
      return dataResposne.data.data
    }
    const customStyles = {
      option: (provided, state) => ({
        color: state.isSelected ? theme.palette.primary.main : 'black',
        padding: 10,
      }),
      control: styles => ({ ...styles, backgroundColor: theme.palette.neutralLight.main_700, height: '56px' }),
    }
    return (
      <Grid item xs={12} key={index} style={{ zIndex: 9999 }}>
        <Typography className={styles["label-login"]}>{`${t(field.name)}${field.required ? "*" : ''}`}</Typography>
        <Controller
          render={({ field: { name, value, onChange } }) => (
            <AsyncSelect
              cacheOptions
              defaultOptions
              name={name}
              styles={customStyles}
              value={value}
              getOptionLabel={e => `${e.id}-${e.name}`}
              getOptionValue={e => e.id}
              loadOptions={loadOptions}
              onChange={onChange}
              style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
            />
          )}

          control={control}
          name={field.id}
          defaultValue={defaultValues[field.id] || ''}
        />
      </Grid>
    )
  }

  const renderFileUpload = ({ field, index }) => {
    return (
      <Grid item xs={12} key={index}>
        <Typography className={styles["label-login"]}>{`${t(field.name)}${field.required ? "*" : ''}`}</Typography>
        <Controller
          render={({ field: { name, value, onChange } }) => (
            <DropZone
              {...field}
              name={name}
              value={value}
              onChange={onChange}
              error={errors[field.id]}
              style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
            />
          )}
          control={control}
          name={field.id}
          defaultValue={defaultValues[field.id] || []}
          rules={{ required: field.required }}
        />
      </Grid>
    )
  }

  return (
    <div className={styles.container}>
      <Box component="form" validate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {formFields.map((field, index) => {
            if (field.fieldType == "input") {
              return renderInput({ field, index })
            } else if (field.fieldType === 'dropdown') {
              return renderDropdown({ field, index })
            } else if (field.fieldType === 'fileUpload') {
              return renderFileUpload({ field, index })
            } else if (field.fieldType === 'searchDropdown') {
              return renderSearchDropdown({ field, index })
            } else {
              return renderInput({ field, index })
            }
          })}
        </Grid>
        {preButton}
        <Button
          type="submit"
          fullWidth
          className={'button-button'}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t(buttonText)}
        </Button>
        {postButton}
      </Box>
    </div>
  )
}

