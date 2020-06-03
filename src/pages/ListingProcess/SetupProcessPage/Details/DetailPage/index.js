import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js'
import { Wrapper, Box, Title, StepButtons, Input, TextArea, Select, WYSIWYGTextArea } from 'components'

const DetailPage = ({ listing, values, setFieldValue, handleChange, handleBlur, ...props }) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    props.setFatherValues(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  useEffect(() => {
    try {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(values.listingData.description))))
    } catch (err) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(values.listingData.description)))
    }
  }, [values.listingData.description])

  const _handleWYSIWYGBlur = () => {
    const description = convertToRaw(editorState.getCurrentContent())
    setFieldValue('listingData.description', JSON.stringify(description))
  }


  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Details - Info" />
        <Box>
          <Title
            type="h3"
            title="Title"
            subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
            subTitleMargin={10}
          />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto' }} gridGap="30px">
            <Input
              placeholder="Ie. Car park 100m walk to Central Station"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Description" subtitle="Sell 'em the dream." subTitleMargin={10} />
          <WYSIWYGTextArea
            placeholder="Describe your space"
            editorState={editorState}
            onEditorStateChange={editor => {
              setEditorState(editor)
            }}
            onBlur={_handleWYSIWYGBlur}
          />
        </Box>
        <Box>
          <Title
            type="h3"
            title="Directions"
            subtitle="Give guest any instructions for arriving, access or parking."
            subTitleMargin={10}
          />
          <TextArea
            placeholder="This helps guest find spaces that aren’t easy to find"
            name="listingData.direction"
            value={values.listingData.direction}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <Title
            type="h3"
            title="Wifi"
            subtitle="Wifi username and password only sent to guest after the booking is successful"
            subTitleMargin={10}
          />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            <Select
              name="listingData.wifiSpeed"
              value={values.listingData.wifiSpeed}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Wifi Speed</option>
              <option value={`802.11a`}>802.11a - 6 to 24 Mbps</option>
              <option value={`802.11b`}>802.11b - 11 Mbps</option>
              <option value={`802.11d`}>802.11d - 11 to 54 Mbps</option>
              <option value={`802.11g`}>802.11g - 54 Mbps</option>
              <option value={`802.11n`}>802.11n - 100 Mbps</option>
            </Select>
            <Input
              name="listingData.wifiNetwork"
              placeholder="Wifi network"
              value={values.listingData.wifiNetwork}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="listingData.wifiPassword"
              placeholder="Wifi password"
              value={values.listingData.wifiPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.push('feature') }}
          next={{
            // disabled: !location,
            onClick: () => props.history.push('amenities')
            // isLoading: isLoadingCreating
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_DetailForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      title: listing.title || '',
      listingData: {
        ...listing.listingData,
        description: listing.listingData.description || '',
        direction: listing.listingData.direction || '',
        wifiSpeed: listing.listingData.wifiSpeed || '',
        wifiNetwork: listing.listingData.wifiNetwork || '',
        wifiPassword: listing.listingData.wifiPassword || ''
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

DetailPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(DetailPage)
