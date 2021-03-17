import React from 'react'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go/'
import './Nsfw.css';
const Nsfw = ({  name, value,full_name }) => {
  return (
    <div className = 'nsfw'>
      {/* <h2>Image Moderation</h2> */}
     <div className="user__profile">

        <div className='user__profileIcon' >{ full_name[0].toUpperCase()}</div>
      <h3> { full_name }  </h3>
      </div>

        <div className="nsfw__image">
        {/* <img src={image} /> */}

        <AiOutlineEyeInvisible className='nsfw__icon' />
        <h3>The following media includes potentially sensitive content, We don't allow these kind of posts on our platform, Sorry <span style= {{color:"black"}} >
        {  full_name.toUpperCase()} </span>😁</h3>
        
        </div>
          <div className="results__column">
            <h3>Predicted  Concept</h3>
            <h3>Probability</h3>
          </div>
          <div className="results__listItems">
            <span className="results__predictedConceptName">
            {name}
            </span>
            <span className="result__probability">
              {value}
            </span>
          </div>

    </div>


  )
}

export default Nsfw
