import React from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';

const IntroduceRight = ({title, ...props}) => {
    IntroduceRight.propTypes = {
        title: PropTypes.string,
      };
    return (
        <div className='w-full mx-auto py-12'>
            <div className='font-playfair text-3xl text-center font-semibold my-10'>
                <h3>{title}</h3>
            </div>
            <div className='flex sm:flex-col-reverse sm:gap-3 sm:w-[90%] md:flex-row lg:w-[85%] mx-auto relative justify-start'>
                <div className='sm:p-10 md:w-[60%] lg:w-1/2 md:p-10 md:pl-28 md:absolute right-0 top-[10%] border-solid border-[#C09B5A] border-[1px] rounded-xl'>
                    <div>
                        <h1 className='text-2xl font-medium font-playfair mb-5'>{props.titleContent}</h1>
                    </div>
                    <div className='font-montserrat text-sm leading-6 text-justify'>
                        <p>{props.content}</p>
                    </div>
                    <div className='mt-5 text-end'>
                        <button className='px-4 py-2 bg-[#C09B5A] text-white rounded-xl text-sm border-transparent duration-300 border-[1px] border-solid hover:bg-white hover:text-[#C09B5A] hover:border-[#C09B5A]'>SEE MORE</button>
                    </div>
                </div>
                <div className='md:w-1/2 lg:w-[55%]'>
                    <img className='md:h-[330px] w-full lg:h-[430px] rounded-xl' src={props.image} alt='introduce'/>
                </div>
            </div>

        </div>
    );
};

export default IntroduceRight;