import React from 'react';
import styled from 'styled-components';


const IntroduceLeftStyles = styled.section`
    width: 1150px;
    margin: auto;
    padding: 10px 0;
    .introduce-title{
        text-align: center;
        font-family: "Playfair Display", serif;
        font-size: 36px;
    }
    .introduce-content{
        position: relative;
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        .content-left{
            width: 550px;
            position: absolute;
            right: 0;
            top: 10%;
            border-radius: 20px;
            padding: 30px 40px 30px 120px;
            border: 1px solid #C09B5A;
            .title-content{
                font-weight: 400;
                font-family: "Playfair Display", serif;
                font-size: 28px;
            }
            .description-content{
                margin: 20px 0;
                text-align: justify;
                font-family: "Montserrat Alternates", sans-serif;
            }
            .btn-box{
                .btn-content{
                    padding: 7px 25px;
                    background-color: #C09B5A;
                    border-radius: 10px;
                    text-transform: uppercase;
                    font-size: 14px;
                    color: #fff;
                    border: 1px solid #C09B5A;
                    cursor: pointer;
                    transition: .5s;
                    &:hover{
                        color: #C09B5A;
                        background-color: #fff;
                    }
                }
            }
        }
        .content-right{
            width: 650px;
            height: 400px;
            .content-img{
                width: 100%;
                height: 100%;
                border-radius: 20px;
            }
        }
    }
`
const IntroduceLeft = ({title, ...props}) => {
    return (
        <IntroduceLeftStyles>
            <div className='introduce-title'>
                <h3>{title}</h3>
            </div>
            <div className='introduce-content'>
                <div className='content-left'>
                    <div>
                        <h1 className='title-content'>{props.titleContent}</h1>
                    </div>
                    <div className='description-content'>
                        <p>{props.content}</p>
                    </div>
                    <div className='btn-box'>
                        <button className='btn-content'>SEE MORE</button>
                    </div>
                </div>
                <div className='content-right'>
                    <img className='content-img' src={props.image} alt='introduce'/>
                </div>
            </div>

        </IntroduceLeftStyles>
    );
};

export default IntroduceLeft;