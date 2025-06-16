import { processDaySection} from './day.js';
import { processRecentsSection } from './recent.js';
import { processCuratedSection } from './curated.js';

export function routeHome() {
    processDaySection();
    processRecentsSection();
    processCuratedSection();
}