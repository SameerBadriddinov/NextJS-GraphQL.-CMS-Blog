import React, {useState, useEffect} from 'react';
import { getSingleSimilarPosts } from '../services';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const SinglePost = ({categories, slug}) => {
  const [singlePost, setSinglePost] = useState([])

  useEffect(() => {
    getSingleSimilarPosts(categories, slug)
      .then((res) => setSinglePost(res))
  }, [])
  console.log(singlePost)

  return (
    <>
      {singlePost.map((post, index) => (
        <div className="relative h-72" key={index}>
          <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
          <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
          <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
            <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>
            <div className="flex items-center absolute bottom-5 w-full justify-center">
              <Image
                unoptimized
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle drop-shadow-lg rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.author.name}</p>
            </div>
          </div>
          <Link href={`/post/${post.slug}`}>
            <div className="tranition duration-500 hover:-translate-x-3 hover:bg-indigo-700 hover:text-white absolute arrow-btn -left-4 top-20 mt-10 text-center py-3 px-3 cursor-pointer bg-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-indigo w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
          </Link>
        </div>
      ))}
    </>
  )
};

export default SinglePost;
