import { AiFillDelete } from 'react-icons/ai'
import { useStateValue } from '../../context/StateProvider'
import './Post.css'

const Post = ({full_name, name, value, image ,id,removePost}) => {
const [{ user}] = useStateValue();
// console.log(user,full_name);


return (
<div className="input__results">
{/* <h2>Image Moderation</h2> */}
{full_name === user.toUpperCase() ? (
<div className='delete__post' >
<AiFillDelete
onClick = {()=>removePost(id)}

className='delete__icon' /></div>
)
: ''}

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
