import React, { cloneElement } from 'react'
import { ReactComponent as SingleSpace } from './svg/single-space.svg'
import { ReactComponent as MultipleSpace } from './svg/multiple-space.svg'
// Category
import { ReactComponent as CategoryCoworking } from './svg/category/category_coworking.svg'
import { ReactComponent as CategoryDesk } from './svg/category/category_desk.svg'
import { ReactComponent as CategoryEvents } from './svg/category/category_events.svg'
import { ReactComponent as CategoryHospitality } from './svg/category/category_hospitality.svg'
import { ReactComponent as CategoryMeetingRoom } from './svg/category/category_meeting_room.svg'
import { ReactComponent as CategoryOffice } from './svg/category/category_office.svg'
import { ReactComponent as CategoryParking } from './svg/category/category_parking.svg'
import { ReactComponent as CategoryStorage } from './svg/category/category_storage.svg'
import { ReactComponent as CategoryCreative } from './svg/category/category_creative.svg'
// Sub-Category
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

// Generic
import { ReactComponent as QuestionMark } from './svg/generic/question_mark.svg'
import { ReactComponent as Bin } from './svg/generic/bin.svg'
import { ReactComponent as Camera } from './svg/generic/camera.svg'
import { ReactComponent as StarFull } from './svg/generic/star-full.svg'
import { ReactComponent as StarOutline } from './svg/generic/star-outline.svg'
import { ReactComponent as Calendar } from './svg/generic/calendar.svg'
import { ReactComponent as Play } from './svg/generic/play.svg'
import { ReactComponent as Flag } from './svg/generic/flag.svg'
import { ReactComponent as GoogleLogo } from './svg/generic/logo-google.svg'
import { ReactComponent as Pin } from './svg/generic/pin.svg'
import { ReactComponent as ConfirmSchedule } from './svg/generic/confirm-schedule.svg'
import { ReactComponent as Rating } from './svg/generic/rating.svg'
import { ReactComponent as Resume } from './svg/generic/resume.svg'
import { ReactComponent as CheckMark } from './svg/generic/check-mark.svg'
import { ReactComponent as Search } from './svg/generic/search.svg'
import { ReactComponent as Clock } from './svg/generic/clock.svg'
import { ReactComponent as PinBGWhite } from './svg/generic/pin-bgwhite.svg'
import { ReactComponent as Bookmark } from './svg/generic/bookmark.svg'
import { ReactComponent as BookmarkFilled } from './svg/generic/bookmark-filled.svg'
import { ReactComponent as Floorplan } from './svg/generic/floor-plan.svg'

// Access Type
import { ReactComponent as AccessTypeKeys } from './svg/access-type/access_type_keys.svg'
import { ReactComponent as AccessTypePerson } from './svg/access-type/access_type_person.svg'
import { ReactComponent as AccessTypeSmartLock } from './svg/access-type/access_type_smart_lock.svg'
import { ReactComponent as AccessTypSwipeCard } from './svg/access-type/access_type_swipe_card.svg'
import { ReactComponent as AccessTypeReceptionist } from './svg/access-type/access_type_receptionist.svg'
import { ReactComponent as AccessTypeHost } from './svg/access-type/access_type_host.svg'
import { ReactComponent as AccessTypePinCode } from './svg/access-type/access_type_pin_code.svg'

// Specifications
import { ReactComponent as SpecificationCapacity } from './svg/specifications/specification_capacity.svg'
import { ReactComponent as SpecificationCarLarge } from './svg/specifications/specification_car_large.svg'
import { ReactComponent as SpecificationCarMedium } from './svg/specifications/specification_car_medium.svg'
import { ReactComponent as SpecificationCarPark } from './svg/specifications/specification_car_park.svg'
import { ReactComponent as SpecificationCarSmall } from './svg/specifications/specification_car_small.svg'
import { ReactComponent as SpecificationCovered } from './svg/specifications/specification_covered.svg'
import { ReactComponent as SpecificationEntranceHeight } from './svg/specifications/specification_entrance_height.svg'
import { ReactComponent as SpecificationFurnishedNo } from './svg/specifications/specification_furnished_no.svg'
import { ReactComponent as SpecificationFurnishedYes } from './svg/specifications/specification_furnished_yes.svg'
import { ReactComponent as SpecificationMeetingRoomQuantity } from './svg/specifications/specification_meetingroom_quantity.svg'
import { ReactComponent as SpecificationSize } from './svg/specifications/specification_size.svg'
import { ReactComponent as SpecificationUncovered } from './svg/specifications/specification_uncovered.svg'
import { ReactComponent as SpecificationMinimumTerm } from './svg/specifications/specification_minimum_term.svg'
import { ReactComponent as SpecificationOpeningDays } from './svg/specifications/specification_opening_days.svg'

// Amenities
import { ReactComponent as Amenitie3rdParty } from './svg/amenities/amenities_3rdparty.svg'
import { ReactComponent as Amenitie247Acess } from './svg/amenities/amenities_27_7access.svg'
import { ReactComponent as AmenitieAcUnit } from './svg/amenities/amenities_ac_unit.svg'
import { ReactComponent as AmenitieAccomodation } from './svg/amenities/amenities_accomodation.svg'
import { ReactComponent as AmenitieAccessible } from './svg/amenities/amenities_accessible.svg'
import { ReactComponent as AmenitieAlarm } from './svg/amenities/amenities_alarm.svg'
import { ReactComponent as AmenitieAlcoholLicense } from './svg/amenities/amenities_alcohol_license.svg'
import { ReactComponent as AmenitieAvEquip } from './svg/amenities/amenities_AVequip.svg'
import { ReactComponent as AmenitieBartender } from './svg/amenities/amenities_bartender.svg'
import { ReactComponent as AmenitieBeachfront } from './svg/amenities/amenities_beachfront.svg'
import { ReactComponent as AmenitieBikeFriendly } from './svg/amenities/amenities_bikefriendly.svg'
import { ReactComponent as AmenitieBoatRamp } from './svg/amenities/amenities_boat_ramp.svg'
import { ReactComponent as AmenitieCafe } from './svg/amenities/amenities_cafe.svg'
import { ReactComponent as AmenitieCCTV } from './svg/amenities/amenities_CCTV.svg'
import { ReactComponent as AmenitieChairs } from './svg/amenities/amenities_chairs.svg'
import { ReactComponent as AmenitieChangingRooms } from './svg/amenities/amenities_changingrooms.svg'
import { ReactComponent as AmenitieChildFriendly } from './svg/amenities/amenities_child_friendly.svg'
import { ReactComponent as AmenitieClothingRacks } from './svg/amenities/amenities_clothingracks.svg'
import { ReactComponent as AmenitieCoffeeTea } from './svg/amenities/amenities_coffeetea.svg'
import { ReactComponent as AmenitieColdStorage } from './svg/amenities/amenities_cold_storage.svg'
import { ReactComponent as AmenitieCooler } from './svg/amenities/amenities_cooler.svg'
import { ReactComponent as AmenitieDancefloor } from './svg/amenities/amenities_dancefloor.svg'
import { ReactComponent as AmenitieEntertainment } from './svg/amenities/amenities_entertainment.svg'
import { ReactComponent as AmenitieFilteredwater } from './svg/amenities/amenities_filteredwater.svg'
import { ReactComponent as AmenitieFitnessEquipment } from './svg/amenities/amenities_fitnessequipment.svg'
import { ReactComponent as AmenitieFloralService } from './svg/amenities/amenities_floralservice.svg'
import { ReactComponent as AmenitieFreeBeer } from './svg/amenities/amenities_freebeer.svg'
import { ReactComponent as AmenitieFullyServiced } from './svg/amenities/amenities_fullyserviced.svg'
import { ReactComponent as AmenitieFurnished } from './svg/amenities/amenities_furnished.svg'
import { ReactComponent as AmenitieGas } from './svg/amenities/amenities_gas.svg'
import { ReactComponent as AmenitieGym } from './svg/amenities/amenities_gym.svg'
import { ReactComponent as AmenitieHighCeillings } from './svg/amenities/amenities_highceilings.svg'
import { ReactComponent as AmenitieHost } from './svg/amenities/amenities_host.svg'
import { ReactComponent as AmenitieIndoor } from './svg/amenities/amenities_indoor.svg'
import { ReactComponent as AmenitieInHouseCatering } from './svg/amenities/amenities_inhousecatering.svg'
import { ReactComponent as AmenitieKitchenEquip } from './svg/amenities/amenities_kitchen_equip.svg'
import { ReactComponent as AmenitieKitchen } from './svg/amenities/amenities_kitchen.svg'
import { ReactComponent as AmenitieLiveBandFacility } from './svg/amenities/amenities_live_band_facility.svg'
import { ReactComponent as AmenitieLoadingDock } from './svg/amenities/amenities_loading_dock.svg'
import { ReactComponent as AmenitieLowCeilings } from './svg/amenities/amenities_lowceilings.svg'
import { ReactComponent as AmenitieMailBox } from './svg/amenities/amenities_mailbox.svg'
import { ReactComponent as AmenitieMarquee } from './svg/amenities/amenities_marquee.svg'
import { ReactComponent as AmenitieMirrors } from './svg/amenities/amenities_mirrors.svg'
import { ReactComponent as AmenitieOffsiteParking } from './svg/amenities/amenities_offsite_parking.svg'
import { ReactComponent as AmenitieOnsiteParking } from './svg/amenities/amenities_onsite_parking.svg'
import { ReactComponent as AmenitieOutDoorCovered } from './svg/amenities/amenities_outdoorcovered.svg'
import { ReactComponent as AmenitieOutDoorUncovered } from './svg/amenities/amenities_outdooruncovered.svg'
import { ReactComponent as AmenitiePetsAllowed } from './svg/amenities/amenities_pets_allowed.svg'
import { ReactComponent as AmenitiePhoneline } from './svg/amenities/amenities_phoneline.svg'
import { ReactComponent as AmenitiePhotographService } from './svg/amenities/amenities_photograph_service.svg'
import { ReactComponent as AmenitiePool } from './svg/amenities/amenities_pool.svg'
import { ReactComponent as AmenitiePoolTable } from './svg/amenities/amenities_pooltable.svg'
import { ReactComponent as AmenitiePowerOutlets } from './svg/amenities/amenities_poweroutlets.svg'
import { ReactComponent as AmenitiePrinter } from './svg/amenities/amenities_printer.svg'
import { ReactComponent as AmenitieProjector } from './svg/amenities/amenities_projector.svg'
import { ReactComponent as AmenitieProductionEquip } from './svg/amenities/amenities_production_equip.svg'
import { ReactComponent as AmenitieElectronicEntry } from './svg/amenities/amenities_secure_electronic_entry.svg'
import { ReactComponent as AmenitieSecurePremises } from './svg/amenities/amenities_secure_premises.svg'
import { ReactComponent as AmenitieSecurityPatrols } from './svg/amenities/amenities_security_patrols.svg'
import { ReactComponent as AmenitieSelfStorage } from './svg/amenities/amenities_selfstorage.svg'
import { ReactComponent as AmenitieShower } from './svg/amenities/amenities_shower.svg'
import { ReactComponent as AmenitieStorageLoocks } from './svg/amenities/amenities_storageloocks.svg'
import { ReactComponent as AmenitieStoreRoom } from './svg/amenities/amenities_storeroom.svg'
import { ReactComponent as AmenitieTables } from './svg/amenities/amenities_tables.svg'
import { ReactComponent as AmenitieTabletennis } from './svg/amenities/amenities_tabletennis.svg'
import { ReactComponent as AmenitieTemperatureControl } from './svg/amenities/amenities_temperature_control.svg'
import { ReactComponent as AmenitieTrollyAccess } from './svg/amenities/amenities_trolly_access.svg'
import { ReactComponent as AmenitieTv } from './svg/amenities/amenities_tv.svg'
import { ReactComponent as AmenitieUnderground } from './svg/amenities/amenities_underground.svg'
import { ReactComponent as AmenitieVehicleAccess } from './svg/amenities/amenities_vehicleaccess.svg'
import { ReactComponent as AmenitieVideoConference } from './svg/amenities/amenities_video_conference.svg'
import { ReactComponent as AmenitieWeddingCake } from './svg/amenities/amenities_weddingcake.svg'
import { ReactComponent as AmenitieWhiteboard } from './svg/amenities/amenities_whiteboard.svg'
import { ReactComponent as AmenitieWifi } from './svg/amenities/amenities_wifi.svg'

import { ReactComponent as AmenitieBathrooms } from './svg/amenities/amenities_bathrooms.svg'
import { ReactComponent as AmenitieBreakoutRooms } from './svg/amenities/amenities_breakout_rooms.svg'
import { ReactComponent as AmenitieComferencePhone } from './svg/amenities/amenities_conference_phone.svg'
import { ReactComponent as AmenitieGrill } from './svg/amenities/amenities_grill.svg'
import { ReactComponent as AmenitieHeating } from './svg/amenities/amenities_heating.svg'
import { ReactComponent as AmenitieLargeTable } from './svg/amenities/amenities_large_table.svg'
import { ReactComponent as AmenitiePowerTieIn } from './svg/amenities/amenities_power_tie_in.svg'
import { ReactComponent as AmenitiePrivateEntrance } from './svg/amenities/amenities_private_entrance.svg'
import { ReactComponent as AmenitieSink } from './svg/amenities/amenities_sink.svg'
import { ReactComponent as AmenitieSoundSystem } from './svg/amenities/amenities_sound_system.svg'
import { ReactComponent as AmenitieStage } from './svg/amenities/amenities_stage.svg'
import { ReactComponent as AmenitieTableware } from './svg/amenities/amenities_tableware.svg'

import { ReactComponent as Download } from './svg/download.svg'
import { ReactComponent as ArrowLeft } from './svg/generic/arrow_left.svg'
import { ReactComponent as FullLeftArrow } from './svg/generic/full-left-arrow.svg'
import { ReactComponent as MovieCamera } from './svg/generic/movie-camera.svg'

import { ReactComponent as CalendarThin } from './svg/generic/calendar-thin.svg'
import { ReactComponent as ClockBooking } from './svg/generic/clock-booking.svg'
import { ReactComponent as ConfirmWithHost } from './svg/generic/confirm-with-host.svg'
import { ReactComponent as HourGlass } from './svg/generic/hourglass.svg'
import { ReactComponent as Payment } from './svg/generic/payment.svg'
import { ReactComponent as Price } from './svg/generic/price.svg'

// EVENT Activites
import { ReactComponent as EventActivityFirstBirthday } from './svg/EVENT/ACTIVITIES/1st-birthday.svg'
import { ReactComponent as EventActivityAnniversaries } from './svg/EVENT/ACTIVITIES/anniversaries.svg'
import { ReactComponent as EventActivityBabyShowers } from './svg/EVENT/ACTIVITIES/baby-showers.svg'
import { ReactComponent as EventActivityBarMitzvah } from './svg/EVENT/ACTIVITIES/bar-mitzvah.svg'
import { ReactComponent as EventActivityBirthdays } from './svg/EVENT/ACTIVITIES/birthdays.svg'
import { ReactComponent as EventActivityBrandActivations } from './svg/EVENT/ACTIVITIES/brand-activations.svg'
import { ReactComponent as EventActivityConferences } from './svg/EVENT/ACTIVITIES/conferences.svg'
import { ReactComponent as EventActivityCorporateEvents } from './svg/EVENT/ACTIVITIES/corporate-events.svg'
import { ReactComponent as EventActivityEngagementParties } from './svg/EVENT/ACTIVITIES/engagement-parties.svg'
import { ReactComponent as EventActivityFashionShows } from './svg/EVENT/ACTIVITIES/fashion-shows.svg'
import { ReactComponent as EventActivityHensBucksParties } from './svg/EVENT/ACTIVITIES/hens-bucks-parties.svg'
import { ReactComponent as EventActivityKidsParties } from './svg/EVENT/ACTIVITIES/kids-parties.svg'
import { ReactComponent as EventActivityKitchenTea } from './svg/EVENT/ACTIVITIES/kitchen-tea.svg'
import { ReactComponent as EventActivityMusicPerformance } from './svg/EVENT/ACTIVITIES/music-performance.svg'
import { ReactComponent as EventActivityOffsiteMeetings } from './svg/EVENT/ACTIVITIES/offsite-meetings.svg'
import { ReactComponent as EventActivityPrivateDinners } from './svg/EVENT/ACTIVITIES/private-dinners.svg'
import { ReactComponent as EventActivityProductLaunch } from './svg/EVENT/ACTIVITIES/product-launch.svg'
import { ReactComponent as EventActivityReceptions } from './svg/EVENT/ACTIVITIES/receptions.svg'
import { ReactComponent as EventActivityReunions } from './svg/EVENT/ACTIVITIES/reunions.svg'
import { ReactComponent as EventActivitySeminars } from './svg/EVENT/ACTIVITIES/seminars.svg'
import { ReactComponent as EventActivityTradeShows } from './svg/EVENT/ACTIVITIES/trade-shows.svg'
import { ReactComponent as EventActivityWeddings } from './svg/EVENT/ACTIVITIES/weddings.svg'
import { ReactComponent as EventActivityWorkshops } from './svg/EVENT/ACTIVITIES/workshops.svg'

// CREATIVE STUDIO Activites
import { ReactComponent as CreativeStudioActivityArtGallery } from './svg/CREATIVE/ACTIVITIES/STUDIO/art-gallery.svg'
import { ReactComponent as CreativeStudioActivityAuditionsCastings } from './svg/CREATIVE/ACTIVITIES/STUDIO/auditions-castings.svg'
import { ReactComponent as CreativeStudioActivityBrandActivations } from './svg/CREATIVE/ACTIVITIES/STUDIO/brand-activations.svg'
import { ReactComponent as CreativeStudioActivityCinema } from './svg/CREATIVE/ACTIVITIES/STUDIO/cinema.svg'
import { ReactComponent as CreativeStudioActivityDanceClasses } from './svg/CREATIVE/ACTIVITIES/STUDIO/dance-classes.svg'
import { ReactComponent as CreativeStudioActivityDanceStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/dance-studio.svg'
import { ReactComponent as CreativeStudioActivityDesignStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/design-studio.svg'
import { ReactComponent as CreativeStudioActivityExhibitions } from './svg/CREATIVE/ACTIVITIES/STUDIO/exhibitions.svg'
import { ReactComponent as CreativeStudioActivityFashionShows } from './svg/CREATIVE/ACTIVITIES/STUDIO/fashion-shows.svg'
import { ReactComponent as CreativeStudioActivityFashionStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/fashion-studio.svg'
import { ReactComponent as CreativeStudioActivityFilmEditingSuite } from './svg/CREATIVE/ACTIVITIES/STUDIO/film-editing-suite.svg'
import { ReactComponent as CreativeStudioActivityManufacturingSpace } from './svg/CREATIVE/ACTIVITIES/STUDIO/manufacturing-space.svg'
import { ReactComponent as CreativeStudioActivityMusicRehearsalSpace } from './svg/CREATIVE/ACTIVITIES/STUDIO/music-rehearsal-space.svg'
import { ReactComponent as CreativeStudioActivityMusicalPerformances } from './svg/CREATIVE/ACTIVITIES/STUDIO/musical-performances.svg'
import { ReactComponent as CreativeStudioActivityOffsiteMeetings } from './svg/CREATIVE/ACTIVITIES/STUDIO/offsite-meetings.svg'
import { ReactComponent as CreativeStudioActivityPerformanceVenue } from './svg/CREATIVE/ACTIVITIES/STUDIO/performance-venue.svg'
import { ReactComponent as CreativeStudioActivityPhotographyStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/photography-studio.svg'
import { ReactComponent as CreativeStudioActivityRehearsalSpace } from './svg/CREATIVE/ACTIVITIES/STUDIO/rehearsal-space.svg'
import { ReactComponent as CreativeStudioActivitySoundRecordingStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/sound-recording-studio.svg'
import { ReactComponent as CreativeStudioActivityTheatre } from './svg/CREATIVE/ACTIVITIES/STUDIO/theatre.svg'
import { ReactComponent as CreativeStudioActivityVideoFilmShoots } from './svg/CREATIVE/ACTIVITIES/STUDIO/video-film-shoots.svg'
import { ReactComponent as CreativeStudioActivityVisualArtStudio } from './svg/CREATIVE/ACTIVITIES/STUDIO/visual-art-studio.svg'
import { ReactComponent as CreativeStudioActivityWorkshops } from './svg/CREATIVE/ACTIVITIES/STUDIO/workshops.svg'
import { ReactComponent as CreativeStudioActivityCommunityHall } from './svg/CREATIVE/ACTIVITIES/LOCATION/community-hall.svg'
import { ReactComponent as CreativeStudioActivityDinners } from './svg/CREATIVE/ACTIVITIES/LOCATION/dinners.svg'
import { ReactComponent as CreativeStudioActivityFestivals } from './svg/CREATIVE/ACTIVITIES/LOCATION/festivals.svg'
import { ReactComponent as CreativeStudioActivityOpenAirSpace } from './svg/CREATIVE/ACTIVITIES/LOCATION/open-air-space.svg'
import { ReactComponent as CreativeStudioActivityParkBushland } from './svg/CREATIVE/ACTIVITIES/LOCATION/park-bushland.svg'
import { ReactComponent as CreativeStudioActivityPhotographyFilmLocation } from './svg/CREATIVE/ACTIVITIES/LOCATION/photography-film-location.svg'

const Icons = {
  'question-mark': <QuestionMark />,
  'single-space': <SingleSpace />,
  'multiple-space': <MultipleSpace />,
  bin: <Bin />,
  camera: <Camera />,
  'star-full': <StarFull />,
  'star-outline': <StarOutline />,
  calendar: <Calendar />,
  play: <Play />,
  flag: <Flag />,
  'floor-plan': <Floorplan />,
  'google-logo': <GoogleLogo />,
  'category-coworking': <CategoryCoworking />,
  'category-desk': <CategoryDesk />,
  'category-events': <CategoryEvents />,
  'category-creative': <CategoryCreative />,
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
  'sub-category-location': <SubCategoryVenue />,
  'sub-category-wedding': <SubCategoryWeddingVenue />,
  'sub-category-studio': <SubCategoryWeddingVenue />,
  'sub-category-wine-storage': <SubCategoryWineStorage />,

  'access-type-keys': <AccessTypeKeys />,
  'access-type-person': <AccessTypePerson />,
  'access-type-smart-lock': <AccessTypeSmartLock />,
  'access-type-swipe-card': <AccessTypSwipeCard />,
  'access-type-host': <AccessTypeHost />,
  'access-type-pin-code': <AccessTypePinCode />,
  'access-type-receptionist': <AccessTypeReceptionist />,
  'specification-capacity': <SpecificationCapacity />,
  'specification-car-large': <SpecificationCarLarge />,
  'specification-car-medium': <SpecificationCarMedium />,
  'specification-car-park': <SpecificationCarPark />,
  'specification-car-small': <SpecificationCarSmall />,
  'specification-covered': <SpecificationCovered />,
  'specification-entrance-height': <SpecificationEntranceHeight />,
  'specification-furnished-no': <SpecificationFurnishedNo />,
  'specification-furnished-yes': <SpecificationFurnishedYes />,
  'specification-meetingroom-quantity': <SpecificationMeetingRoomQuantity />,
  'specification-size': <SpecificationSize />,
  'specification-uncovered': <SpecificationUncovered />,
  'specification-minimum-term': <SpecificationMinimumTerm />,
  'specification-opening-days': <SpecificationOpeningDays />,
  'amenitie-3rdPartyCatering': <Amenitie3rdParty />,
  'amenitie-247Access': <Amenitie247Acess />,
  'amenitie-airConditioning': <AmenitieAcUnit />,
  'amenitie-accommodation': <AmenitieAccomodation />,
  'amenitie-wheelchairAccess': <AmenitieAccessible />,
  'amenitie-alarm': <AmenitieAlarm />,
  'amenitie-alcoholLicense': <AmenitieAlcoholLicense />,
  'amenitie-avEquipment': <AmenitieAvEquip />,
  'amenitie-bar': <AmenitieBartender />,
  'amenitie-bartender': <AmenitieBartender />,
  'amenitie-beachfront': <AmenitieBeachfront />,
  'amenitie-bikeFriendly': <AmenitieBikeFriendly />,
  'amenitie-boatRamp': <AmenitieBoatRamp />,
  'amenitie-cafe': <AmenitieCafe />,
  'amenitie-cctv': <AmenitieCCTV />,
  'amenitie-chairs': <AmenitieChairs />,
  'amenitie-changingRooms': <AmenitieChangingRooms />,
  'amenitie-childFriendly': <AmenitieChildFriendly />,
  'amenitie-clothingRacks': <AmenitieClothingRacks />,
  'amenitie-coffeeTea': <AmenitieCoffeeTea />,
  'amenitie-coldStorage': <AmenitieColdStorage />,
  'amenitie-cooler': <AmenitieCooler />,
  'amenitie-danceFloor': <AmenitieDancefloor />,
  'amenitie-entertainmentLicense': <AmenitieEntertainment />,
  'amenitie-filteredWater': <AmenitieFilteredwater />,
  'amenitie-fitnessEquipment': <AmenitieFitnessEquipment />,
  'amenitie-floralService': <AmenitieFloralService />,
  'amenitie-freeBeer': <AmenitieFreeBeer />,
  'amenitie-fullyServiced': <AmenitieFullyServiced />,
  'amenitie-furnished': <AmenitieFurnished />,
  'amenitie-gas': <AmenitieGas />,
  'amenitie-gym': <AmenitieGym />,
  'amenitie-highCeilings': <AmenitieHighCeillings />,
  'amenitie-hostAtReception': <AmenitieHost />,
  'amenitie-indoor': <AmenitieIndoor />,
  'amenitie-inhouseCatering': <AmenitieInHouseCatering />,
  'amenitie-kitchenEquipment': <AmenitieKitchenEquip />,
  'amenitie-kitchen': <AmenitieKitchen />,
  'amenitie-liveBandFacility': <AmenitieLiveBandFacility />,
  'amenitie-loadingDock': <AmenitieLoadingDock />,
  'amenitie-lowCeilings': <AmenitieLowCeilings />,
  'amenitie-mailbox': <AmenitieMailBox />,
  'amenitie-marquee': <AmenitieMarquee />,
  'amenitie-mirrors': <AmenitieMirrors />,
  'amenitie-offsiteParking': <AmenitieOffsiteParking />,
  'amenitie-onsiteParking': <AmenitieOnsiteParking />,
  'amenitie-outdoorCovered': <AmenitieOutDoorCovered />,
  'amenitie-outdoorUncovered': <AmenitieOutDoorUncovered />,
  'amenitie-petsAllowed': <AmenitiePetsAllowed />,
  'amenitie-phoneline': <AmenitiePhoneline />,
  'amenitie-photographyService': <AmenitiePhotographService />,
  'amenitie-pool': <AmenitiePool />,
  'amenitie-poolTable': <AmenitiePoolTable />,
  'amenitie-powerOutlets': <AmenitiePowerOutlets />,
  'amenitie-printScanCopy': <AmenitiePrinter />,
  'amenitie-productionEquipment': <AmenitieProductionEquip />,
  'amenitie-projector': <AmenitieProjector />,
  'amenitie-secureEletronicEntry': <AmenitieElectronicEntry />,
  'amenitie-securePremises': <AmenitieSecurePremises />,
  'amenitie-securityPatrols': <AmenitieSecurityPatrols />,
  'amenitie-selfStorage': <AmenitieSelfStorage />,
  'amenitie-showers': <AmenitieShower />,
  'amenitie-storageLockers': <AmenitieStorageLoocks />,
  'amenitie-storeRoom': <AmenitieStoreRoom />,
  'amenitie-tables': <AmenitieTables />,
  'amenitie-tableTennis': <AmenitieTabletennis />,
  'amenitie-temperature-control': <AmenitieTemperatureControl />,
  'amenitie-trolly-access': <AmenitieTrollyAccess />,
  'amenitie-tvMonitor': <AmenitieTv />,
  'amenitie-underground': <AmenitieUnderground />,
  'amenitie-vehicleAccess': <AmenitieVehicleAccess />,
  'amenitie-videoConference': <AmenitieVideoConference />,
  'amenitie-weedingCakeService': <AmenitieWeddingCake />,
  'amenitie-whiteboard': <AmenitieWhiteboard />,
  'amenitie-wifi': <AmenitieWifi />,
  'amenitie-bathrooms': <AmenitieBathrooms />,
  'amenitie-breakout-rooms': <AmenitieBreakoutRooms />,
  'amenitie-conference-phone': <AmenitieComferencePhone />,
  'amenitie-grill': <AmenitieGrill />,
  'amenitie-heating': <AmenitieHeating />,
  'amenitie-large-table': <AmenitieLargeTable />,
  'amenitie-power-tie-in': <AmenitiePowerTieIn />,
  'amenitie-private-entrance': <AmenitiePrivateEntrance />,
  'amenitie-sink': <AmenitieSink />,
  'amenitie-sound-system': <AmenitieSoundSystem />,
  'amenitie-stage': <AmenitieStage />,
  'amenitie-tableware': <AmenitieTableware />,

  download: <Download />,
  'arrow-left': <ArrowLeft />,
  'full-left-arrow': <FullLeftArrow />,
  'movie-camera': <MovieCamera />,
  pin: <Pin />,
  'confirm-schedule': <ConfirmSchedule />,
  rating: <Rating />,
  resume: <Resume />,
  'check-mark': <CheckMark />,
  search: <Search />,
  'clock-bgwhite': <Clock />,
  'pin-bgwhite': <PinBGWhite />,
  'calendar-thin': <CalendarThin />,
  'clock-booking': <ClockBooking />,
  'confirm-with-host': <ConfirmWithHost />,
  hourglass: <HourGlass />,
  payment: <Payment />,
  price: <Price />,
  bookmark: <Bookmark />,
  'bookmark-filled': <BookmarkFilled />,
  'events-activity-1st-birthday': <EventActivityFirstBirthday />,
  'events-activity-anniversaries': <EventActivityAnniversaries />,
  'events-activity-baby-showers': <EventActivityBabyShowers />,
  'events-activity-bar-mitzvah': <EventActivityBarMitzvah />,
  'events-activity-birthdays': <EventActivityBirthdays />,
  'events-activity-brand-activations': <EventActivityBrandActivations />,
  'events-activity-conferences': <EventActivityConferences />,
  'events-activity-corporate-events': <EventActivityCorporateEvents />,
  'events-activity-engagement-parties': <EventActivityEngagementParties />,
  'events-activity-fashion-shows': <EventActivityFashionShows />,
  'events-activity-hens-bucks-parties': <EventActivityHensBucksParties />,
  'events-activity-kids-parties': <EventActivityKidsParties />,
  'events-activity-kitchen-tea': <EventActivityKitchenTea />,
  'events-activity-music-performance': <EventActivityMusicPerformance />,
  'events-activity-offsite-meetings': <EventActivityOffsiteMeetings />,
  'events-activity-private-dinners': <EventActivityPrivateDinners />,
  'events-activity-product-launch': <EventActivityProductLaunch />,
  'events-activity-receptions': <EventActivityReceptions />,
  'events-activity-reunions': <EventActivityReunions />,
  'events-activity-seminars': <EventActivitySeminars />,
  'events-activity-trade-shows': <EventActivityTradeShows />,
  'events-activity-weddings': <EventActivityWeddings />,
  'events-activity-workshops': <EventActivityWorkshops />,

  'creative-activity-art-gallery': <CreativeStudioActivityArtGallery />,
  'creative-activity-auditions-castings': <CreativeStudioActivityAuditionsCastings />,
  'creative-activity-brand-activations': <CreativeStudioActivityBrandActivations />,
  'creative-activity-cinema': <CreativeStudioActivityCinema />,
  'creative-activity-dance-classes': <CreativeStudioActivityDanceClasses />,
  'creative-activity-dance-studio': <CreativeStudioActivityDanceStudio />,
  'creative-activity-design-studio': <CreativeStudioActivityDesignStudio />,
  'creative-activity-exhibitions': <CreativeStudioActivityExhibitions />,
  'creative-activity-fashion-shows': <CreativeStudioActivityFashionShows />,
  'creative-activity-fashion-studio': <CreativeStudioActivityFashionStudio />,
  'creative-activity-film-editing-suite': <CreativeStudioActivityFilmEditingSuite />,
  'creative-activity-manufacturing-space': <CreativeStudioActivityManufacturingSpace />,
  'creative-activity-music-performance-venue': <CreativeStudioActivityMusicalPerformances />,
  'creative-activity-music-rehearsal-space': <CreativeStudioActivityMusicRehearsalSpace />,
  'creative-activity-musical-performances': <CreativeStudioActivityMusicalPerformances />,
  'creative-activity-music-performance': <CreativeStudioActivityMusicalPerformances />,
  'creative-activity-offsite-meetings': <CreativeStudioActivityOffsiteMeetings />,
  'creative-activity-performance-venue': <CreativeStudioActivityPerformanceVenue />,
  'creative-activity-photography-studio': <CreativeStudioActivityPhotographyStudio />,
  'creative-activity-rehearsal-space': <CreativeStudioActivityRehearsalSpace />,
  'creative-activity-sound-recording-studio': <CreativeStudioActivitySoundRecordingStudio />,
  'creative-activity-theatre': <CreativeStudioActivityTheatre />,
  'creative-activity-video-film-shoot': <CreativeStudioActivityVideoFilmShoots />,
  'creative-activity-visual-art-studio': <CreativeStudioActivityVisualArtStudio />,
  'creative-activity-workshops': <CreativeStudioActivityWorkshops />,
  'creative-activity-community-hall': <CreativeStudioActivityCommunityHall />,
  'creative-activity-dinners': <CreativeStudioActivityDinners />,
  'creative-activity-festivals': <CreativeStudioActivityFestivals />,
  'creative-activity-open-air-space': <CreativeStudioActivityOpenAirSpace />,
  'creative-activity-park-bushland': <CreativeStudioActivityParkBushland />,
  'creative-activity-photography-film-location': <CreativeStudioActivityPhotographyFilmLocation />
}

const Icon = props => {
  if (!Icons[props.name]) {
    return cloneElement(Icons['question-mark'], props)
  }
  return cloneElement(Icons[props.name], props)
}
export default Icon
