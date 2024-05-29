import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import SidebarAdmin from '../../components/user/Sidebar/SidebarAdmin';

const LayoutAdminStyles = styled.section`
    width: 1250px;
    margin: auto;
    
`

const LayoutAdmin = ({children}) => {
    return (
        <LayoutAdminStyles>
            <Header/>
            <SidebarAdmin/>
            {children}
        </LayoutAdminStyles>
    );
};

export default LayoutAdmin;