import * as React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/header.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

let StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: theme.palette.primary.main
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function BasicTabs({ tabs, changeTab, selectedTab, tabType = 'tab' }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeTab(newValue)
  };
  const isStepFailed = (step) => {
    return step === (selectedTab || value);
  };
  return (
    <Box sx={{ width: '100%' }}>
      {(tabType === 'tab') &&
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab || value} onChange={handleChange} aria-label="basic tabs example">
            {tabs.map((tab, index) => <StyledTab disabled={tab.disabledClick || false} key={`tab-heading-${index}`} label={tab.heading} {...a11yProps(index)} />)}
          </Tabs>
        </Box>
      }
      {(tabType === 'stepper') &&
        <Stepper activeStep={selectedTab || value} className="mt-3">
          {tabs.map((label, index) => {
            const labelProps = {};
            if (isStepFailed(index)) {
              labelProps.error = true;
            }
            return (
              <Step key={label.heading}>
                <StepLabel {...labelProps}>{label.heading}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      }
      {(tabType === 'progress') &&
        <>
          <Box className='d-flex align-items-center'>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress variant="determinate" value={(parseInt(selectedTab || value) + 1) / 3 * 100} size={62} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <label className={styles["label-login"]}>{`${parseInt(selectedTab || value) + 1}/${tabs.length}`}</label>
              </Box>
            </Box>
            <label className={`${styles["label-login"]} ml-2`}>{tabs[selectedTab || value].heading}</label>
          </Box>
        </>
      }
      {tabs.map((tab, index) => {
        return (
          <TabPanel value={selectedTab || value} index={index} key={index}>
            {tab.component}
          </TabPanel>
        )
      })}
    </Box>
  );
}