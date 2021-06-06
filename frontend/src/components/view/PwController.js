import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PwView from './PwView';

import { HeaderController } from '../ui';
import useStore from '../useStore';

const { Auth } = useStore();

const PwController = ({ viewModel }) => {
    return (
        <>
        <HeaderController
            header={'비밀번호찾기'}
        />
        <PwView

        />
        </>
    );
};

export default PwController;