import React from 'react'
import './Post.css'

const Post = ({full_name, name, value, image }) => {
return (
<div className="input__results">
{/* <h2>Image Moderation</h2> */}
<div className="user__profile">

<div className='user__profileIcon' >{ full_name[0].toUpperCase()}</div>
<h3> { full_name }  </h3>
</div>
<div className="results__image">
<img src={image} />
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


export default Post
