import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import UserInfoView from './UserInfoView';

import { HeaderController } from '../ui';
import useStore from '../useStore';

const { Auth } = useStore();

const UserInfoController = ({ viewModel }) => {
    const [data] = useState(Auth.data);
    return (
        <>
        <HeaderController
            header={'회원정보'}
        />
        <UserInfoView
            data={data}
        />
        </>
    );
};

export default UserInfoController;