import { Box, Button, Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import TabContext from '@mui/lab/TabContext'
import { motion } from 'framer-motion'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import { cn } from '@bem-react/classname'
import Tab from '@mui/material/Tab'

import './CustomerPage.scss'
import {
  selectCustomer,
  selectCustomerAudits,
  selectCustomerErrorMessage,
  selectCustomerProjects,
  selectCustomerSuccessMessage,
  selectLoadingCustomer,
  selectProcessingCustomer,
} from '@customer/state/customer.selectors'
import { Project } from 'shared/models/project'
import { CustomerInfo } from '@customer/components/customer-info/CustomerInfo'
import { ProjectsPanel } from '@customer/components/projects-panel/ProjectsPanel'
import { CustomerPanel } from '@customer/components/customer-panel/CustomerPanel'
import { customerActions } from '@customer/state/customer.reducer'

const componentId = 'CustomerPage'
const bem = cn(componentId)

export const CustomerPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState('3')
  const location = useLocation()
  const [editDialog, setEditDialog] = useState(false)

  const handleEditDialog = () => setEditDialog(!editDialog)

  const customer = useSelector(selectCustomer)
  const customerErrorMessage = useSelector(selectCustomerErrorMessage)
  const customerSuccessMessage = useSelector(selectCustomerSuccessMessage)
  const loadingCustomer = useSelector(selectLoadingCustomer)
  const processingCustomer = useSelector(selectProcessingCustomer)

  const projects = useSelector(selectCustomerProjects)
  const loadingProjects = useSelector(selectLoadingCustomer)

  const audits = useSelector(selectCustomerAudits)
  const loadingAudits = useSelector(selectLoadingCustomer)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const editProject = (project?: Project) => {
    dispatch(
      customerActions.setCustomerDataForProject([customer!._id!, project?._id || '']),
    )
    navigate('/project-page')
  }

  const submitCustomer = (customerData: any) =>
    customerData._id
      ? dispatch(customerActions.updateCustomer(customerData))
      : dispatch(customerActions.createCustomer(customerData))

  const deleteCustomer = (id: string) => dispatch(customerActions.deleteCustomer(id))

  // Load customer data on page load
  useEffect(() => {
    if (location?.state?.tab) {
      setValue(location.state.tab)
    } else dispatch(customerActions.loadCustomerData())
  }, [])

  // Load customer projects and audits on tab change
  useEffect(() => {
    if (value === '3') dispatch(customerActions.loadCustomerData())
    if (value === '2' && customer?._id)
      dispatch(customerActions.loadCustomerProjects(customer._id))
    if (value === '1' && customer?._id)
      dispatch(customerActions.loadCustomerAudits(customer._id))
  }, [value])

  const cleanSuccessMessage = () => {
    dispatch(customerActions.cleanSuccessMessage())
  }

  return (
    <motion.div
      className="motion-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box className={bem()}>
        <span className={bem('Title')}>Customer</span>

        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="Customer Page"
            className={bem('Tabs')}
          >
            <Tab
              label="Audits"
              value="1"
              disabled={!customer}
              className={bem('Tab', { audits: true, active: value === '1' })}
            />
            <Tab
              label="Projects"
              value="2"
              disabled={!customer}
              className={bem('Tab', { projects: true, active: value === '2' })}
            />
            <Tab
              label="Customer"
              value="3"
              className={bem('Tab', { customer: true, active: value === '3' })}
            />
          </TabList>
          <TabPanel value="1" className={bem('TabPanel')}>
            Audits
          </TabPanel>
          <TabPanel value="2" className={bem('TabPanel')}>
            <ProjectsPanel
              projects={projects}
              loading={loadingProjects}
              addProject={editProject}
              editProject={editProject}
              deleteProject={(id) => dispatch(customerActions.deleteProject(id))}
            />
          </TabPanel>
          <TabPanel value="3" className={bem('TabPanel')}>
            {!customer ? (
              <Button onClick={() => handleEditDialog()}>Create Customer</Button>
            ) : (
              <CustomerInfo
                customer={customer}
                avatarUrl={'1.jpg'}
                submit={handleEditDialog}
                submitLable={'Edit'}
              />
            )}

            <Dialog open={editDialog} onClose={handleEditDialog}>
              <DialogContent>
                <CustomerPanel
                  customer={customer}
                  errorMessage={customerErrorMessage}
                  loading={loadingCustomer}
                  processing={processingCustomer}
                  successMessage={customerSuccessMessage}
                  remove={deleteCustomer}
                  submit={submitCustomer}
                  cleanSuccessMessage={cleanSuccessMessage}
                  cancel={handleEditDialog}
                />
              </DialogContent>
            </Dialog>
          </TabPanel>
        </TabContext>
      </Box>
    </motion.div>
  )
}
