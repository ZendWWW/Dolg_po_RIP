import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

if (!root) {
    console.error('Root element not found!');
} else {
    console.log('Root element found, creating MainPage...');
    const mainPage = new MainPage(root);
    mainPage.render();
}