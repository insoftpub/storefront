import Store from './Store';
import actionTypes from '../constants/actionTypes.js';
import { keyBy } from 'lodash';
import { parseCategories } from './parsers/categories';

class CategoriesStore extends Store {
    static storeName = 'categories';

    static handlers = {
        [actionTypes.CATEGORIES_LOAD]: 'categoriesLoaded'
    };

    initialize() {
        this.categories = [];
        this.manufacturers = [];
        this.categoriesById = {};
        this.categoriesBySlug = {};
    }

    getState() {
        return {
            categories: this.categories,
            manufacturers: this.manufacturers,
            categoriesById: this.categoriesById,
            categoriesBySlug: this.categoriesBySlug
        };
    }

    categoriesLoaded(data) {
        const { categories, manufacturers } = parseCategories(data);

        this.categories = categories;
        this.manufacturers = manufacturers;
        this.categoriesById = keyBy(data.results, 'id');
        this.categoriesBySlug = keyBy(data.results, 'slug');

        this.emit('change');
    }

    dehydrate() {
        return {
            categories: this.categories,
            manufacturers: this.manufacturers,
            categoriesById: this.categoriesById,
            categoriesBySlug: this.categoriesBySlug
        };
    }
}

export default CategoriesStore;
