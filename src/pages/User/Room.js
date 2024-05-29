import React from 'react';
import RoomList from '../../components/user/Room/RoomList';
import Sidebar from '../../components/user/Sidebar/Sidebar';
import Layout from '../../layout/User/Layout';


const Room = () => {
    return (
        <Layout>
            <RoomList/>
        </Layout>
    );
};

export default Room;