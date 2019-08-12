/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { Title, Input, Select, TextArea, Button } from 'components'

import { onCreateWeWorkReferral } from 'redux/ducks/partner'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const SectionStyled = styled.div``

const FormPartner = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  validateForm,
  dispatch,
  isValid,
  ...props
}) => {
  
  // useEffect( () => console.log("mount"), [] );
  // useEffect( () => console.log("will update data1"), [ data1 ] );
  // useEffect( () => console.log("will update any") );
  // useEffect( () => () => console.log("will update data1 or unmount"), [ data1 ] );
  // useEffect( () => () => console.log("unmount"), [] );


  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  // const _handleSubmit = () => {
  //   console.log(values)
  //   console.log('isValid', isValid)
  //   console.log('errors', errors)
  //   dispatch(onCreateWeWorkReferral(values))
  // }


  return (
    <form onSubmit={handleSubmit}>
      <WrapperStyled>
        <SectionStyled>
          <Input
            label="Full Name*"
            placeholder="Your full name"
            name="name"
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Email"
            placeholder="Email Address"
            name="email"
            error={errors.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Phone"
            placeholder="Phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>
        
        <SectionStyled>
          <Title title="Tell us more about your introduction" type="h6" subTitleMargin={0} noMargin />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Company"
            placeholder="Company Name"
            name="company"
            error={errors.company}
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          {/* <Select value={values.accessType} name="desks" onChange={_handleSelectChange} label="Number of Desks needed">
            <option>Select a range</option> */}
            {/* {arrayAccessTypes.map(item => (
              <option key={item.id} value={item.itemName}>
                {item.itemName}
              </option>
            ))} */}
          {/* </Select> */}
        </SectionStyled>

        <SectionStyled>
          {/* <DatePicker name="date" label="Number of Desks needed" /> */}
          <Input 
            label="Requested Move In Date" 
            name="date"
            placeholder="date"
            error={errors.company}
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <TextArea
            label="Additional notes"
            name="notes"
            error={errors.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <Button width="100%" type="submit" disabled={!isValid}>SUBMIT INTRODUCTION</Button>

      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    email: Yup.string().typeError('Email field is required'),
    name: Yup.string().typeError('Name field is required'),
    phone: Yup.number(),
    city: Yup.string().typeError('City field is required'),
    requested_location: Yup.string(),
    company_name: Yup.string(),
    requested_move_in_date: Yup.string(),
    desks_estimated: Yup.string(),
    contact_allowed: Yup.string(),
    notes: Yup.string(),
  }),
  validate: {

  },
  handleSubmit: (values, { setSubmitting }) => {
    // dispatch(onCreateWeWorkReferral(values))
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  enableReinitialize: true,
  isInitialValid: true
}

FormPartner.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormPartner)
