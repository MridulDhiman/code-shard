import { auth } from "@/auth";
import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import { Liveblocks } from "@liveblocks/node";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "@/auth";



const liveblocks = new Liveblocks({
    secret: 'sk_dev_DQ3J2R3CX75GrDdx5cCLphXD7pHJgeiCI0bxKH7MqL_CAjyflTblMdIEoq4RgSyy'
  });



  export const POST = auth(async (request, response) =>{
    // const userSession = await auth(request, response);
    // const userSession = await getServerSession()
    // const userSession = await unstable_getServerSession(req, res, authOptions)
    // console.log(userSession);
    connectToDB();
    const userSession = request.auth;
    console.log("User session: ", userSession);

   
  let user;




if(!userSession) {
  user = {
    id: "guestuser@gmail.com",
    info: {
      name: "Guest User",
      color: "#D583F0",
      picture: "https://liveblocks.io/avatars/avatar-1.png",
    },
  };
}

if(userSession) {
  // console.log("User session: ", userSession);
 let sessionUser = userSession?.user;
const existingUser = await User.findOne({email: sessionUser.email});
console.log("Existing User: ", existingUser);
user = {
  id: existingUser._id.toString(),
  info: {
    name: userSession.user.name,
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  }
};
}

    
    const session = liveblocks.prepareSession(user.id,  {
        userInfo: user.info 
    });

    const {room} = await request.json();
    session.allow(room, session.FULL_ACCESS);

    const {body, status } = await session.authorize();
    return new Response(body, {status});

  })