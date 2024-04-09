import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'

export default function GoogleSignin() {
  const { data: session, status } = useSession();

  return (
    <div className="mt-auto p-4 pb-8">
      {status === "authenticated" ? (
        <>
          <div className="mb-4 flex items-center">
            {/* 显示用户图像和名称 */}
            <Image src={session.user?.image ?? ''} width={30} height={30} alt="User Image" className="rounded-full" />
            <span className="ml-2">{session.user?.name}</span>
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            登出
          </button>
        </>
      ) : (
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Google 登入
        </button>
      )}
    </div>
  );
}
