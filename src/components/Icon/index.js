import React, { cloneElement } from 'react'
import { ReactComponent as SingleSpace } from './svg/single-space.svg'
import { ReactComponent as MultipleSpace } from './svg/multiple-space.svg'
//Category
import { ReactComponent as CategoryCoworking } from './svg/category/category_coworking.svg'
import { ReactComponent as CategoryDesk } from './svg/category/category_desk.svg'
import { ReactComponent as CategoryEvents } from './svg/category/category_events.svg'
import { ReactComponent as CategoryHospitality } from './svg/category/category_hospitality.svg'
import { ReactComponent as CategoryMeetingRoom } from './svg/category/category_meeting_room.svg'
import { ReactComponent as CategoryOffice } from './svg/category/category_office.svg'
import { ReactComponent as CategoryParking } from './svg/category/category_parking.svg'
import { ReactComponent as CategoryStorage } from './svg/category/category_storage.svg'
//Sub-Category
import { ReactComponent as SubCategoryBoardRoom } from './svg/sub-category/sub_category_board_room.svg'
import { ReactComponent as SubCategoryBusiness } from './svg/sub-category/sub_category_business.svg'
import { ReactComponent as SubCategoryCafe } from './svg/sub-category/sub_category_cafe.svg'
import { ReactComponent as SubCategoryCarPark } from './svg/sub-category/sub_category_car_park.svg'
import { ReactComponent as SubCategoryCarRvBoat } from './svg/sub-category/sub_category_car_rv_boat.svg'
import { ReactComponent as SubCategoryConferenceRoom } from './svg/sub-category/sub_category_conference_room.svg'
import { ReactComponent as SubCategoryConference } from './svg/sub-category/sub_category_conference.svg'
import { ReactComponent as SubCategoryCorporate } from './svg/sub-category/sub_category_corporate.svg'
import { ReactComponent as SubCategoryCreative } from './svg/sub-category/sub_category_creative.svg'
import { ReactComponent as SubCategoryDesk } from './svg/sub-category/sub_category_desk.svg'
import { ReactComponent as SubCategoryDriveway } from './svg/sub-category/sub_category_driveway.svg'
import { ReactComponent as SubCategoryEntireOffice } from './svg/sub-category/sub_category_entire_office.svg'
import { ReactComponent as SubCategoryFoodtruck } from './svg/sub-category/sub_category_foodtruck.svg'
import { ReactComponent as SubCategoryFunctionCentre } from './svg/sub-category/sub_category_function_centre.svg'
import { ReactComponent as SubCategoryGarage } from './svg/sub-category/sub_category_garage.svg'
import { ReactComponent as SubCategoryHealthFitness } from './svg/sub-category/sub_category_health_fitness.svg'
import { ReactComponent as SubCategoryKitchen } from './svg/sub-category/sub_category_kitchen.svg'
import { ReactComponent as SubCategoryMarketStalls } from './svg/sub-category/sub_category_market_stalls.svg'
import { ReactComponent as SubCategoryMeetingRoom } from './svg/sub-category/sub_category_meeting_room.svg'
import { ReactComponent as SubCategoryPersonal } from './svg/sub-category/sub_category_personal.svg'
import { ReactComponent as SubCategoryPopupRetail } from './svg/sub-category/sub_category_popup_retail.svg'
import { ReactComponent as SubCategoryPrivateOffice } from './svg/sub-category/sub_category_private_office.svg'
import { ReactComponent as SubCategoryPrivateRoom } from './svg/sub-category/sub_category_private_room.svg'
import { ReactComponent as SubCategoryRestaurant } from './svg/sub-category/sub_category_restaurant.svg'
import { ReactComponent as SubCategoryRetail } from './svg/sub-category/sub_category_retail.svg'
import { ReactComponent as SubCategorySports } from './svg/sub-category/sub_category_sports.svg'
import { ReactComponent as SubCategoryTrainingRoom } from './svg/sub-category/sub_category_training_room.svg'
import { ReactComponent as SubCategoryVenue } from './svg/sub-category/sub_category_venue.svg'
import { ReactComponent as SubCategoryWeddingVenue } from './svg/sub-category/sub_category_wedding_venue.svg'
import { ReactComponent as SubCategoryWineStorage } from './svg/sub-category/sub_category_wine_storage.svg'

//Generic
import { ReactComponent as Bin } from './svg/generic/bin.svg'
import { ReactComponent as Camera } from './svg/generic/camera.svg'
import { ReactComponent as StarFull } from './svg/generic/star-full.svg'
import { ReactComponent as StarOutline } from './svg/generic/star-outline.svg'

const Icons = {
  'single-space': <SingleSpace />,
  'multiple-space': <MultipleSpace />,
  'category-coworking': <CategoryCoworking />,
  'category-desk': <CategoryDesk />,
  'category-events': <CategoryEvents />,
  'category-hospitality-retail': <CategoryHospitality />,
  'category-meetings': <CategoryMeetingRoom />,
  'category-office': <CategoryOffice />,
  'category-parking': <CategoryParking />,
  'category-storage': <CategoryStorage />,
  'category-venue': <SubCategoryVenue />,
  'sub-category-boardroom': <SubCategoryBoardRoom />,
  'sub-category-business': <SubCategoryBusiness />,
  'sub-category-cafe': <SubCategoryCafe />,
  'sub-category-car-park': <SubCategoryCarPark />,
  'sub-category-car-rv-boat': <SubCategoryCarRvBoat />,
  'sub-category-conference-room': <SubCategoryConferenceRoom />,
  'sub-category-conference': <SubCategoryConference />,
  'sub-category-corporate': <SubCategoryCorporate />,
  'sub-category-creative': <SubCategoryCreative />,
  'sub-category-desk': <SubCategoryDesk />,
  'sub-category-driveway': <SubCategoryDriveway />,
  'sub-category-entire-office': <SubCategoryEntireOffice />,
  'sub-category-food-truck': <SubCategoryFoodtruck />,
  'sub-category-function-centre': <SubCategoryFunctionCentre />,
  'sub-category-garage': <SubCategoryGarage />,
  'sub-category-health-fitness': <SubCategoryHealthFitness />,
  'sub-category-kitchen': <SubCategoryKitchen />,
  'sub-category-market-stalls': <SubCategoryMarketStalls />,
  'sub-category-meeting-room': <SubCategoryMeetingRoom />,
  'sub-category-personal': <SubCategoryPersonal />,
  'sub-category-popup': <SubCategoryPopupRetail />,
  'sub-category-private-office': <SubCategoryPrivateOffice />,
  'sub-category-private-room': <SubCategoryPrivateRoom />,
  'sub-category-restaurant': <SubCategoryRestaurant />,
  'sub-category-retail': <SubCategoryRetail />,
  'sub-category-sports': <SubCategorySports />,
  'sub-category-trainning-room': <SubCategoryTrainingRoom />,
  'sub-category-venue': <SubCategoryVenue />,
  'sub-category-wedding': <SubCategoryWeddingVenue />,
  'sub-category-wine-storage': <SubCategoryWineStorage />,
  'bin': <Bin />,
  'camera': <Camera />,
  'star-full': <StarFull />,
  'star-outline': <StarOutline />
}

const Icon = props => {
  if (!Icons[props.name]) {
    return null
  }
  return cloneElement(Icons[props.name], props)
}
export default Icon
