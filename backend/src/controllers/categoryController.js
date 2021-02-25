const Category = require('../models/categoryModel');
const slugify = require('slugify');

function createCategories(categories, parendId = null){
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parendId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parendId);
    }
    for(let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parendId){
        categoryObj.parendId = req.body.parendId
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error});
        if(category){
            return res.status(201).json({ category })
        }
    })
}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({ error });
        if(categories){
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList})
        }
    })
}