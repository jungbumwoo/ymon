const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    const {
        name, price, description, category, quantity, createBy
    } = req.body;

    let productPicture = [];
    if(req.files.length > 0){
        productPicture = req.files.map(file => {
            return { img: file.fileName }
        })
    }

    const product = new Product({
        name: req.body.name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        category,
        createBy: req.user._id
    });

    product.save((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product })
        }
    })
};

// const category = require('../models/category');
exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug})
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({error});
        }
        if(category){
            Product.find({ category: category._id})
            .exec((error, products) => {
                if(error){
                    return res.status(400).json({error});
                }
                if(products.length > 0){
                    res.status(400).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                        }
                    });
                }

            })
        }
    })
}