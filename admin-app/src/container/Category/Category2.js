import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout/Layout.js"
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from "../../actions";
import Input from "../../components/UI/Input.js";
import Modal from "../../components/UI/Modal.js";
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [ categoryName, setCategoryName ] = useState('');
    const [ categoryImage, setCategoryImage ] = useState('');
    const [ parentCategoryId, setParentCategoryId ] = useState('');
    const [ updateCategoryModal, setUpdateCategoryModal ] = useState(false);
    const [ show, setShow ] = useState(false);
    
    const [ checked, setChecked] = useState([]);
    const [ expanded, setExpanded ] = useState([]);
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ expandedArray, setExpandedArray ] = useState([]);

    const createCategoryList = (categories, bucket = [] ) => {
        for(let dog of categories) {
            bucket.push({ value: dog._id, name: dog.name, parentId: dog.parentId });
            if (dog.children.length > 0){
                createCategoryList( dog.children, bucket);
            }
        }
    }

    const handleShow = () => setShow(true);
    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        // setCategoryImage('') ??? 이건 안해줘도 되려나
        setShow(false);
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if(type == "checked"){
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {...item, [key]: value} : item);
            setCheckedArray(updatedCheckedArray);
        } else if(type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray); 
        }
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input 
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(dog => 
                                <option key={dog.value} value={dog.value}>{dog.name}</option>)
                        }
                </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        )
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parendId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
        .then(result => {
            if(result){
                dispatch(getAllCategory())
            } 
        })
    }

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Categories'}
                sg="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) => 
                        // Row key??
                        <Row key={index}>
                            <Col>
                                <Input 
                                    value={item.name}
                                    placeholder={'Category Name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map(dog => 
                                            <option key={dog.value} value={dog.value}>{dog.name}</option>)
                                    }
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <h6>Checked Categories</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row>
                            <Col>
                                <Input 
                                    value={item.value}
                                    placeholder={'Category Name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map(dog =>
                                            <option key={dog.name} value={dog.value}>{dog.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
            </Modal>
        )
    }

    const deleteCategory = () => {

    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
            >
                
            </Modal>
        )
    }
    return(
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={deleteCategory}>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}
        </Layout>
    )
}
