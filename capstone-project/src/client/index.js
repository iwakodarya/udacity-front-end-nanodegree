// Import Javascript files
import { newTripEventsSetUp, createNewTrip } from './js/newTripFlow';
import { displayTrips } from './js/sidePanel';

// Import Sass files
import './styles/common.scss';
import './styles/main.scss';
import './styles/banners.scss';
import './styles/buttons.scss';
import './styles/sidePanel.scss';

displayTrips();
newTripEventsSetUp();

export { createNewTrip };
