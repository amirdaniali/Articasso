import { locationHandler } from "./locationHandler.js";

// route function to prevent default url loading and let locationHandler kick in
export function eventRoute(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    locationHandler();
};