import React from 'react';
import LayoutAdmin from '../../layout/Admin/LayoutAdmin';
import CategoryDetail from '../../components/admin/Table/CategoryDetail';
import CategoryList from '../../components/admin/Table/CategoryList';

const CategoryPage = () => {
    return (
        <LayoutAdmin>
            <CategoryList/>
        </LayoutAdmin>
    );
};

export default CategoryPage;