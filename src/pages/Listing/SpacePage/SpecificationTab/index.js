import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Title, Input, Checkbox, Select, TextArea } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 80px;
`

const SectionStyled = styled.div``

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
`

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
`

const SpecificationTab = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">tete</button>
      <WrapperStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Title*"
            subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
          />
          <Input label="Description" placeholder="e.g. Car park 100m walk to Central Station" />
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Specifications*"
            subtitle="Give users the quick highlights of the space. These are also important search criteria for guests to find their perfect space."
          />
          <InputGroup>
            <Input
              label="Capacity"
              name="capacity"
              placeholder="Specification"
              error={errors.capacity && touched.capacity && errors.capacity}
              value={values.capacity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input label="Size" placeholder="Specification" />
            <Input label="Car Space" placeholder="Specification" />
            <Select label="Type" value={0} />
          </InputGroup>
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="About"
            subtitle="Sell ‘em the dream. Start broad, then get specific. Include features and details that make your space special. Don’t forget to mention the light, he ambience, the vibe plus any good transport options. Local food options or other local gems. Be honest, but be persuasive."
          />
          <TextArea placeholder="Describe your space" />
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Amenities" subtitle="What features does your space offer guests?" />
          <CheckboxGroup>
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
          </CheckboxGroup>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Space Rules" subtitle="Let guests know about the rules of the space." />
          <CheckboxGroup>
            <Checkbox label="Keep noise/music within regulations" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Vacate space within time allocated" />
            <Checkbox label="Not suitable for children" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Amenity name" />
            <Checkbox label="Remove rubbish" />
          </CheckboxGroup>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Access Information*" subtitle="Let your guests know how they’ll get in." />
          <div style={{ width: '350px' }}>
            <Select value={0} />
          </div>
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Photos*"
            subtitle="Photos help guests imagine using your space. You can start with one and add more after you publish."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto' }}>
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
          </div>
          <p>
            TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
            perspective. Spaces look best in natural light. Include all areas your guest can access.
          </p>
        </SectionStyled>
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'SpecificationForm',
  mapPropsToValues: props => ({
    capacity: props.capacity || ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    capacity: Yup.number('Capacity need to be number').required('Capacity is required!')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  enableReinitialize: true
}

SpecificationTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationTab)
