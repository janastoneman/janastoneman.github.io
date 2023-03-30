// these are functions that should run on nearly every page
import cascadeLink from './cascadeLink.js';
import runMobile from './mobile.js';
import setActiveLink from './setActiveLink.js';

cascadeLink();
runMobile();
setActiveLink();

const hasAccordion = document.querySelector('div.accordion-body');
if (hasAccordion) {
  import('./accordion.js')
    .then((module) => {
      module.default();
    });
}

const hasAnchor = document.querySelector('[href^="#"]');
if (hasAnchor) {
  import('./anchor-focus.js')
    .then((module) => {
      module.default();
    });
}

const hasLazyLoad = document.querySelector('.lazy-load');
const hasAnimateOnScroll = document.querySelector('.animate-on-scroll');
if (hasLazyLoad || hasAnimateOnScroll) {
  import('./actionOnScroll.js')
    .then((module) => {
      module.default();
    });
}

const hasModal = document.querySelector('.modal');
if (hasModal) {
  import('./modal.js')
    .then((module) => {
      module.default();
    });
}

const hasDropdown = document.querySelector('.dropdown-menu');
if (hasDropdown) {
  import('./dropdown.js')
    .then((module) => {
      module.default();
    });
}

const hasDataTable = document.querySelector('.table-datatable');
if (hasDataTable && !hasDataTable.getAttribute('data-spreadsheet-id')) {
  import('./vender/datatable.js')
    .then((module) => {
      // eslint-disable-next-line no-new
      new module.DataTable(hasDataTable);
    });
}

const hasGoogleTable = document.querySelector('.table-google');
if (hasGoogleTable && hasGoogleTable.getAttribute('data-spreadsheet-id')) {
  import('./tables/modular-datatable.js')
    .then((module) => {
      module.default();
    });
}

const hasSticky = document.querySelector('.parent-is-sticky');
if (hasSticky) {
  import('./sticky.js')
    .then((module) => {
      module.default();
    });
}

const hasScholarshipTable = document.querySelector('.scholarship-table');
if (hasScholarshipTable) {
  import('./tables/scholarships.js')
    .then((module) => {
      module.default();
    });
}
