import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
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
      {(tabType === 'tab') ?
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab || value} onChange={handleChange} aria-label="basic tabs example">
            {tabs.map((tab, index) => <StyledTab disabled={tab.disabledClick || false} key={`tab-heading-${index}`} label={tab.heading} {...a11yProps(index)} />)}
          </Tabs>
        </Box>
        :
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