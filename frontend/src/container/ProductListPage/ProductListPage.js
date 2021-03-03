import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";

const ProductListPage = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])

    return(
        <Layout>
            <p>Product List Page</p>
        </Layout>
    )
};

export default ProductListPage;