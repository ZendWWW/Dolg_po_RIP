import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (`
            <div id="product-page">
                <h2>Детали карточки</h2>
                <div id="product-content"></div>
            </div>
        `);
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            console.log('Product data:', data, 'Status:', status);
            if (data && status === 200) {
                this.renderData(data);
            } else {
                this.renderError();
            }
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    renderError() {
        this.pageRoot.innerHTML += '<p>Ошибка загрузки данных</p>';
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}