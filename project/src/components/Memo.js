import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/components.css';

import axios from 'axios';

function Memo(props) {

    const { id } = useParams();

    const [showComponent, setShowComponent] = useState();

    const [Memo, setMemo] = useState(props);
    const [newMemo, setNewMemo] = useState('');

    const memoSubmit = async (event) => {

        try {
            const response = await axios.post('http://localhost:3000/api/Memo', { memo: newMemo });
            setMemo([response.data, ...props.MainMemoData]);
            setNewMemo('');
        } catch (err) {
            console.error(err);
        }
    }

    const memoDelete = async (a) => {

        try {
            const response = await axios.delete(`http://localhost:3000/api/Memo`, { data: { memo: a.memo } });
            const updatedMemoList = props.MainMemoData.filter(memo => memo.memo !== a.memo);
            setMemo(updatedMemoList, ...props.MainMemoData);
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <div className='common_page'>
            <div className='content_area'>

                <form onSubmit={memoSubmit}>

                    <div className='memo_input'>
                        <textarea onInput={(e) => {
                            setNewMemo(e.target.value.replaceAll("<br>", "\r\n"))
                        }}>

                        </textarea>
                    </div>

                    <div className='memo_btn'>
                        <button href='#'>메모 추가하는 버튼</button>
                    </div>
                </form>

                <div className='memo_wrap'>

                    {
                        props.MainMemoData.map(function (a, i) {
                            return (
                                <div className='memo_content' key={i}>
                                    <p className='font_text' onClick={(e) => { setShowComponent(a, a.id) }} style={{ whiteSpace: 'pre-wrap' }}>{props.MainMemoData[i].memo}</p>
                                    <form className='form_pos memo_pos'>
                                        <button className='btn_close' onClick={() => memoDelete(a)}>
                                            <div></div>
                                            <div></div>
                                        </button>
                                    </form>
                                </div>
                            )
                        })
                    }

                    {showComponent && <AnnotationContent props={props.MainMemoData} id={showComponent} />}

                </div>
            </div>
        </div>

    )

    function AnnotationContent(props) {

        let [fade, setFade] = useState('')

        useEffect(() => {
            const fadeTimer = setTimeout(() => { setFade('showThis') }, 100)
            return () => {
                clearTimeout(fadeTimer);
                setFade('')
            }
        }, props.id)

        return (

            <div className={`annotation_content ${props.id ? fade : ""}`}>

                <div className='annotation_content_pos'>
                    <title className='font_text color_w' style={{ whiteSpace: 'pre-wrap' }}>{props.id.memo}</title>
                </div>

                <button className='color_w btn_close memo_btn_pos' onClick={() => setShowComponent()}>
                    <div></div>
                    <div></div>
                </button>

            </div>

        )

    }

}

export default Memo;
