const categoriesModels = require('../models/categoriesModels');


const getAllCategories = async (req, res) => {
    const lang = req.params.lang;
    categoriesModels.getCategories(lang).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

const getCategoryName = async (req, res) => {
    const lang = req.params.lang;
    const catId = req.params.catId;
    categoriesModels.categoryName(lang, catId).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

const getNewProducts = async (req, res) => {
    const lang = req.params.lang;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const user = req.user;
    categoriesModels.newProducts(lang, limit, user?.id).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

const getOfferProducts = async (req, res) => {
    const lang = req.params.lang;
    const user = req.user ? req.user : null;
    categoriesModels.offerProducts(lang, user?.id).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

const getCategoryProducts = async (req, res) => {
    const lang = req.params.lang;
    const catId = req.params.catId;
    const limit = req.query.limit;
    const user = req.user ? req.user : null;
    let page = req.query.page ? (req.query.page - 1) * 16 : 0;
    const sort = req.query.sort;
    categoriesModels.categoryProducts(lang, catId, limit, page, sort, user?.id).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

const getProduct = async (req, res) => {
    console.log('************************')
    const lang = req.params.lang;
    const catId = req.params.catId;
    const productId = req.params.productId;
    const user = req.user ? req.user : null;
    categoriesModels.product(lang, productId, catId, user?.id).then((product, err) => {
        // if (err) return res.status(500).send({ msg: err });
        console.log(product, 'this is prodct', productId, catId, lang, user);
        categoriesModels.productImages(productId).then((images, err) => {
            if (err) return res.status(500).send({ msg: err });
            return res.status(200).json({
                product: product[0],
                imgs: images
            });
        });
    });
};

const getSearchProducts = async (req, res) => {
    const lang = req.params.lang;
    const searchProduct = req.params.searchProduct;
    categoriesModels.searchProduct(lang, searchProduct).then((result, err) => {
        if (err) return res.status(500).send({ msg: err });
        return res.status(200).json(result);
    });
};

module.exports = {
    getAllCategories,
    getCategoryName,
    getNewProducts,
    getOfferProducts,
    getCategoryProducts,
    getProduct,
    getSearchProducts,
};
