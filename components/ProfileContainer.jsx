import { makeFilesAndDependenciesUIStateLike } from "@/utils";
import { CommentContextProvider } from "@/context/CommentContext";
import { getCommentsOfShard } from "@/lib/actions";
import ProfileCard from "./ProfileCard";
import { Fragment } from "react";

const getComments = async (shard) => {
  const comments = await getCommentsOfShard(shard);
  return comments;
};

function ProfileContainer({ shards, id: userId }) {
  const shardsCollection =
    shards.length > 0
      ? shards.map(async (shard, index) => {
          if (shard.mode === "collaboration") {
            return <Fragment key={index}></Fragment>;
          }

        //   const comments = await getCommentsOfShard(shard._id.toString());

          const [files, dependencies, devDependencies] = shard.isTemplate
            ? makeFilesAndDependenciesUIStateLike(
                shard.files,
                shard.dependencies,
              )
            : [null, null, null];
          const likeStatus = shard.likedBy?.includes(userId)
            ? "liked"
            : "unliked";

          return (
            <CommentContextProvider key={shard._id.toString()}>
              <ProfileCard
                creator={shard.creator}
                // comments={comments}
                likeStatus={likeStatus}
                likes={shard.likedBy?.length ?? 0}
                isTemplate={shard.isTemplate}
                content={{
                  templateType: shard.templateType,
                  files,
                  dependencies,
                  devDependencies,
                }}
                mode={shard.mode}
                type={shard.type}
                title={shard.title}
                id={shard._id.toString()}
              />
            </CommentContextProvider>
          );
        })
      : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {shards.length > 0 ? (
        shardsCollection
      ) : (
        <p className="text-white p-2 col-span-full">No Shards Yet...</p>
      )}
    </div>
  );
}

export default ProfileContainer;
