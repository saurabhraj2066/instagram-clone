import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@material-ui/core";
import Imageupload from "./ImageUpload";
import { IGEmbed } from "react-ig-embed";
import Footer from "./Footer";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  // Array of post object of the react for the short term
  // Each post will have 3 data username caption imageUrl
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

  // signup code
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // Runs a piece of code on a specific condition
  useEffect(() => {
    // This is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // Every time a new post is added, this code is fired
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);


  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://whatmeghanwore.net/wp-content/uploads/2019/10/2475.new-instagram-text-logo.png"
          alt="loading"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          // Shows when you are logged in
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            {/* Donate btn  */}
          <Button><a href="https://rzp.io/l/EraPJs4lj" target="_blank" className="donate__link">Donate</a></Button>

          </div>
        )}
      </div>
      <div>
      {user?.displayName ? (
        <Imageupload username={user.displayName} />
      ) : (
        <h3 className="warning">Sorry!! You need to login to upload...</h3>
      )}
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <IGEmbed url="https://www.instagram.com/tv/Ck_VvG2MhJ6/?utm_source=ig_web_copy_link" />
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className="app__signup">
              <centre>
                <img
                  className="app__headerImage"
                  src="https://whatmeghanwore.net/wp-content/uploads/2019/10/2475.new-instagram-text-logo.png"
                  alt="loading-logo"
                />
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>
                  Sign Up
                </Button>
                
              </centre>
            </form>
          </Box>
        </Modal>

        {/* Another Modal */}
        <Modal
          open={openSignIn}
          onClose={setOpenSignIn}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className="app__signup">
              <centre>
                <img
                  className="app__headerImage"
                  src="https://whatmeghanwore.net/wp-content/uploads/2019/10/2475.new-instagram-text-logo.png"
                  alt="loading-logo"
                />
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}>
                  Sign In
                </Button>
                
              </centre>
            </form>
          </Box>
        </Modal>
        <div>
        </div>
      </div>

      {/* {user?.displayName ? (
        <Imageupload username={user.displayName} />
      ) : (
        <h3 className="warning">Sorry!! You need to login to upload...</h3>
      )} */}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
