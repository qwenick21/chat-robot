import { auth } from "@/app/api/auth/[...nextauth]/route";
import { fetchChatRoomPermissions } from "@/lib/data"

export async function checkRoomAuth(roomId: number) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) return false

    const roomPermissions = await fetchChatRoomPermissions(email ,roomId);
    if (!roomPermissions) return false

    return true
}
