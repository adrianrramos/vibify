export default async (firebase: any, provider: any) => {
  try {
    const { user, additionalUserInfo } = await firebase.auth().signInWithPopup(provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = await user?.getIdToken();
    const handle = user?.displayName;
    const email = user?.email;
    const userId = user?.uid;
    const newUser = additionalUserInfo?.isNewUser;
    const tokenName = "FBIdToken";
    const FBIdToken = `Bearer ${token}`;
    // The signed-in user info.

    localStorage.setItem(tokenName, FBIdToken);

    let userData = {
      handle,
      userId,
      email,
      newUser,
      FBIdToken,
    };

    return userData;
  } catch (err) {
    console.error(err);
  }
};
