## How to implement optimistic updates in the features involving toggle button like likes/dislikes, follow/unfollow for better user experience.

Whenever you like a particular post in Instagram, from the User's perspective, the like button just toggles itself and updates itself in the background. So, we also tried to emulate this feature.

Workflow would be like this:
1. User clicks on button.
2. UI updates automatically.
3. Asynchronously request gets sent to server to update the state in database. 
4. If the HTTP Response returns in 4**/5** status code, (i.e. client side or server side error respectively), then we can rollback UI to last consistent state and show something like a popup saying, something went wrong or something like that.


## Implementation 1 
> Using useOptimistic() hook

```javascript
"use client";
const Component = ({initialFollowing, initialFollowers}) => {
 const [optimisticFollowers, setOptimisticFollowers] =
    useOptimistic(followers);
  const [following, setFollowing] = useState(initialFollowing);
  let [hasFollowed, setHasFollowed] = useState(false);
  let [optimisticHasFollowed, setOptimisticHasFollowed] =
    useOptimistic(hasFollowed);

    const handleFollowersAction = async () => {
    setOptimisticHasFollowed((prev) => !prev);
    if (optimisticHasFollowed) {
      setOptimisticFollowers((prev) => prev - 1);
    }

    if (!optimisticHasFollowed) {
      setOptimisticFollowers((prev) => prev + 1);
    }

    await handleFollowersOfUser(
      name,
      session?.user?.name,
      optimisticHasFollowed,
    );
  };


 return ( 
     <div>
            <form action={handleFollowersAction}>
              <button type="submit">
                {optimisticHasFollowed ? "Unfollow" : "Follow"}{" "}
              </button>
            </form>
          
          <p>
            <span>{optimisticFollowers} </span> Follower |{" "}
            <span>{following}</span> Following{" "}
          </p>
        </div> 
        );


export default Component;
};
```


### Server Actions
```javascript
export const handleFollowersOfUser = async (
  mainUser,
  guestUser,
  hasFollowed,
) => {
  try {
    connectToDB();
    const mainUserDetails = await User.findOne({ name: mainUser });
    const guestUserDetails = await User.findOne({ name: guestUser });

    if (!mainUserDetails || !guestUserDetails) {
      throw new Error("Main user or guest user not found");
    }

    let isValidActivity = false;

    if (!hasFollowed) {
      mainUserDetails.followers.push(guestUser);
      guestUserDetails.following.push(mainUser);

      isValidActivity = true;
    }

    if (hasFollowed) {
      if (mainUserDetails.followers.length > 0)
        mainUserDetails.followers.pull(guestUser);
      if (guestUserDetails.following.length > 0)
        guestUserDetails.following.pull(mainUser);
    }

    await Promise.all([mainUserDetails.save(), guestUserDetails.save()]);

    if (isValidActivity) {
      await Activity.create({
        activity: "follow",
        followerId: guestUserDetails._id,
        followingId: mainUserDetails._id,
      });
    }

    revalidateTag(`${mainUser.toLowerCase().split(" ").join("-")}`);
  } catch (error) {
    console.log("Could not perform the action");
    console.log(error.message);
  }
};
```

