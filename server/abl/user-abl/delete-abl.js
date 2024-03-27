const UserDao = require("../../dao/user-dao");
// const PostDao = require("../../dao/post-dao");
const path = require("path");

let userDao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
);

// let postDao = new PostDao(
//   path.join(__dirname, "..", "..", "storage", "posts.json")
// );

function DeleteAbl(req, res) {
  const userId = req.params.id;
  const user = req.user; 

  // Verify that the authenticated user is an admin
  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Unauthorized: Only admins can delete users." });
  }

  // Get the user to be deleted
  const userToDelete = userDao.get(userId);
  if (!userToDelete) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get all posts
  // const posts = postDao.list();

  // // Remove the user ID from the userIdList of all posts
  // const updatedPosts = posts.map((post) => {
  //   if (post.userIdList && post.userIdList.includes(userId)) {
  //     // Remove the userId from the list
  //     post.userIdList = post.userIdList.filter(
  //       (id) => id !== userId
  //     );
  //   }
  //   return post;
  // });

  // // Update the posts in the storage
  // updatedPosts.forEach((post) => {
  //   postDao.update(post.postId, post);
  // });

  // Finally, delete the user
  userDao.delete(userId);

  res.json({
    message: `User with id ${userId} has been deleted and any associated posts have been updated.`,
  });
}

module.exports = DeleteAbl;
