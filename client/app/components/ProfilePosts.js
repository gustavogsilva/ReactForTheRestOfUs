import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import Axios from 'axios'
import LoadingDotsIcon from "./LoadingDotsIcon"
import Page from "./Page"

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const {username} = useParams()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        setPosts(response.data)
        setIsLoading(false)
      } catch(e) {
        console.log(e.response.data)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) return <LoadingDotsIcon />

  return (
      <div className="list-group">
        {posts.map(post => {
            const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

            return (
              <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src={post.author.avatar} />
                <strong>{post.title}</strong> {" "}
                <span className="text-muted small">on {dateFormatted} </span>
              </Link>
          )
        })}
      </div>
  );
}

export default ProfilePosts;