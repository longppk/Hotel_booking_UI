import React from 'react';
import RoomList from '../components/Room/RoomList';
import Sidebar from '../components/Sidebar/Sidebar';
import Layout from '../layout/Layout';


const Room = () => {
    return (
        <Layout>
            <RoomList/>
        </Layout>
    );
};

export default Room;