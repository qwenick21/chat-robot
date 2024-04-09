import { useSession } from "next-auth/react";

export default function SideNavHeader({
  addNewChat,
}: {
  addNewChat: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { status } = useSession();

  if (status !== 'authenticated') return <></>
  return (
    <div className="flex items-center justify-between p-5">
      <div></div>
      <button
        onClick={addNewChat}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        {/* 示例 SVG 图标，这里是一个加号 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
    )
  ;
}
