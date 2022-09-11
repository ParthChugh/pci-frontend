
import events from "constants/events";

export const trackEvent = (eventName, data) => {
  try {
    dataLayer.push(eventName, data);
  } catch (err) { }
};

export default trackEvent;
export { events as EVENT };
