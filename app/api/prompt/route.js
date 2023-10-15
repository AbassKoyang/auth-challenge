import Picture from "@/models/picture";
import { dbConnect } from "@/utils/database";

export const GET = async (request) => {
    try {
        await dbConnect()

        const pictures = await Picture.find({}).populate('creator')

        return new Response(JSON.stringify(pictures), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all pictures", { status: 500 })
    }
} 