import Picture from "@/models/picture";
import { dbConnect } from "@/utils/database";


export const POST = async (request) => {
    const { userId, caption, tag} = await request.json();

    try {
        await dbConnect();
        const newPicture = new Picture({ creator: userId, caption, tag});

        await newPicture.save();
        return new Response(JSON.stringify(newPicture), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
        console.log(error)
    }
}