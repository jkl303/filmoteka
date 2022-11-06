import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import { renderUI } from './renderHomePageUI';

// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();
