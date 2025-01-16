import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchChatRoomPermissions } from "@/lib/data"

export async function checkRoomAuth(roomId: number) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return false

    const roomPermissions = await fetchChatRoomPermissions(email ,roomId);
    if (!roomPermissions) return false

    return true
}
