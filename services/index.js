import { request, gql } from "graphql-request";

const grapqhlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(grapqhlAPI, query)
  return result.postsConnection.edges
}

export const getPostDetails = async(slug) => {
  const query = gql`
    query GetPostDetails($slug: String!){
      post(where: {slug: $slug}) {
        author {
          bio
          name
          id
          photo{
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage{
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `

  const result = await request(grapqhlAPI, query, {slug})
  return result.post
}

export const getCategoryPost = async(slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!){
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(grapqhlAPI, query, {slug})
  return result.postsConnection.edges
}

export const getRecentPosts = async() => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(grapqhlAPI, query)
  return result.posts
}

export const getSimilarPosts = async(categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(grapqhlAPI, query, {categories, slug})
  return result.posts
}

export const getCategories = async() => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(grapqhlAPI, query)
  return result.categories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const getComments = async(slug) => {
  const query = gql `
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(grapqhlAPI, query, {slug})
  return result.comments
}

export const getFeaturedPosts = async() => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage{
          url
        }
        title
        slug
        createdAt
      }
    }
  `

  const result = await request(grapqhlAPI, query)
  return result.posts
}

export const getSingleSimilarPosts = async(categories, slug) => {
  
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        first: 1
      ) {
        title
        featuredImage{
          url
        }
        createdAt
        slug
        author {
          name
          photo {
            url
          }
        }
      }
    }
  `

  const result = await request(grapqhlAPI, query, {categories, slug})
  return result.posts
}