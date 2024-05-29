import React from 'react';
import LayoutAdmin from '../../layout/Admin/LayoutAdmin';
import SidebarAdmin from '../../components/user/Sidebar/SidebarAdmin';
import RoomList from '../../components/admin/Table/RoomList';

const RoomListPage = () => {
    return (
        <LayoutAdmin>
            <RoomList/>
        </LayoutAdmin>
    );
};

export default RoomListPage;