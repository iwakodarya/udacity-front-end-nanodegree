// Import Javascript files
import { createNewTrip } from './js/newTripFlow.js';
import { addDestination } from './js/tripView.js';  
import { displayTrips } from './js/sidePanel.js';
import { setUpInputModal } from './js/common.js';

// Import Sass files
import './styles/common.scss';
import './styles/main.scss';
import './styles/banners.scss';
import './styles/buttons.scss';
import './styles/sidePanel.scss';
import './styles/modals.scss';

displayTrips();
setUpInputModal('add-trip-button', 'new-trip-modal', createNewTrip);
setUpInputModal('add-destination-button', 'new-destination-modal', addDestination);

export { createNewTrip };
