import React, { useState, useEffect } from 'react';

import '../css/components.css';
import { useNavigate } from 'react-router-dom';

// import { getWriteList } from '../Api';

function WriteList(props) {

    const [showComponent, setShowComponent] = useState();
    const [write, setWrite] = useState(props);

    const memoSubmit = async (event) => {

        try {
            const response = await axios.post('http://localhost:3000/api/Write');

        } catch (err) {
            console.error(err);
        }
    }

    const memoDelete = async (a) => {

        try {
            const response = await axios.delete(`http://localhost:3000/api/Write`, { data: { memo: a.memo } });

        } catch (err) {
            console.error(err);
        }
    }

}
    