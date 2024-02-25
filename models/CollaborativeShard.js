import { Shard } from "./Shard";


const collaboratingShardSchema = new Schema({
    roomId: Schema.Types.UUID,
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
    }, {
        discriminatorKey:'kind',
        timestamps: true
    });
    
    export const CollaborativeShard = models?.Shard?.discriminators?.CollaborativeShard || Shard.discriminator('CollaborativeShard', collaboratingShardSchema);