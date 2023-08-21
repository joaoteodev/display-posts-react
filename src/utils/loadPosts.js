const getRandomColor = () => {
  const randomColor = Math.random().toString(16).slice(-6);
  return `https://via.placeholder.com/600/${randomColor}&text=`;
};

export const loadPosts = async url => {
  const postsUrl = url + "posts";
  // const imagesUrl = url + "photos";

  // ! Removed imagesResponse from await list
  const [postsResponse] = await Promise.all([
    fetch(postsUrl)
    // fetch(imagesUrl)
  ]);
  const postsContent = await postsResponse.json();
  // const images = await imagesResponse.json();

  // *Sending a random color to make layout more beautiful
  const posts = postsContent.map((posts, index) => {
    return { ...posts, image: getRandomColor() };
  });

  return posts;
};
