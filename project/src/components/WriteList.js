import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import '../css/components.css';

function WriteList(props) {

    const [isToggleOn, setIsToggleOn] = useState(false);

    const handleClick = () => {
        setIsToggleOn(!isToggleOn);
    }

    const [showComponent, setShowComponent] = useState();
    const [write, setWrite] = useState(props);

    const newTitle = useRef();
    const newSubTitle = useRef();
    const newContent = useRef();

    const writeSubmit = async (event) => {

        try {
            const response = await axios.post('http://localhost:3000/api/WriteList', {
                title: newTitle.current.value,
                subTitle: newSubTitle.current.value,
                content: newContent.current.value
            });
            setWrite([response.data, ...props.WriteListData]);
            newTitle.current.value = '';
            newSubTitle.current.value = '';
            newContent.current.value = '';

        } catch (err) {
            console.error(err);
        }

    }

    const writeDelete = async (a) => {

        try {
            const response = await axios.delete(`http://localhost:3000/api/WriteList`, { data: { title: a.title } });
            const updatedWriteList = props.WriteListData.filter(title => title.title !== a.title);
            setWrite([updatedWriteList, ...props.WriteListData]);
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <div className='common_page'>
            <div className='content_area'>

                <div className='content_write'>
                    <button onClick={handleClick}>글 추가하기</button>
                </div>

                {
                    props.WriteListData.map(function (a, i) {
                        return (
                            <div>
                                <div className='WriteDiv' key={i} onClick={() => { setShowComponent(a, a.id) }}>
                                    <WriteList props={props.WriteListData[i]} i={i} />

                                </div>
                                <form className='form_pos'>
                                    <button className='btn_close' onClick={() => writeDelete(a)}>
                                        <div></div>
                                        <div></div>
                                    </button>
                                </form>
                            </div>
                        )
                    })
                }

                {showComponent && <View props={props.WriteListData} id={showComponent} />}
                {isToggleOn ? <Write /> : null}

            </div>
        </div>

    )

    function WriteList(props) {

        return (

            <div className='write_list'>
                <div className='write_list_btn'>
                    <button></button>
                    <button></button>
                </div>
                <span>{props.props.title}</span>
                <strong>{props.props.subTitle}</strong>
                <p>{props.props.content}</p>
            </div>

        )

    }

    function View(props) {

        let [fade, setFade] = useState('')

        useEffect(() => {
            const fadeTimer = setTimeout(() => { setFade('showThis') }, 100)
            return () => {
                clearTimeout(fadeTimer);
                setFade('')
            }
        }, props)

        return (

            <div className={`view_page ${props.id ? fade : ""}`}>
                <div className='view_content'>
                    <title>{props.id.title}</title>
                    <span>{props.id.subTitle}</span>
                    <p>{props.id.content.replaceAll("<br>", "\r\n")}</p>
                </div>
                <form className='form_pos'>
                    <button className='btn_close color_w' onClick={() => setShowComponent()}>
                        <div></div>
                        <div></div>
                    </button>
                </form>
            </div>

        )

    }

    function Write() {

        let [fade, setFade] = useState('')

        useEffect(() => {
            const fadeTimer = setTimeout(() => { setFade('showThis') }, 100)
            return () => {
                clearTimeout(fadeTimer);
                setFade('')
            }
        }, [])

        return (
            <div className={`write_page ${fade}`}>
                <div className='write_page_pos'>
                    <form>
                        <input type="text" placeholder="TITLE" className="write_title" ref={newTitle}></input>
                        <input type="text" placeholder="SUBTITLE" className="write_subtitle" ref={newSubTitle}></input>
                        <textarea type="text" placeholder="CONTENT" className="write_textarea" ref={newContent.replaceAll("<br>", "\r\n")}></textarea>
                        <button className='btn_common' onClick={writeSubmit}>저장</button>
                    </form>
                </div>
                <button className='form_pos' onClick={handleClick}>
                    <div></div>
                    <div></div>
                </button>
            </div>
        )
    }

}

export default WriteList;