import React from 'react';
import Layout from '../../layout/User/Layout';
import ListCategory from '../../components/user/Category/DetailCategory';
import HomeBanner from '../../module/home/HomeBanner';

const ListCategoryPage = () => {
    return (
        <Layout>
            <HomeBanner/>
            <ListCategory/>
        </Layout>
    );
};

export default ListCategoryPage;