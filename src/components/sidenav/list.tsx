import clsx from "clsx";
import Link from "next/link";
import { userEnterSubmit } from "@/lib/util";
import { ChatRoom } from "@/lib/type";

interface Props {
  links: ChatRoom[];
  pathname: string;
  handleNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleEdit: (id: number, isUpate: boolean, name: string) => void;
  handleDelete: (id: number) => void;
}

export default function SideNavList({
  links,
  pathname,
  handleNameChange,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <ul className="flex flex-col p-5 flex-grow overflow-auto">
      {links.map((link) => {
        return (
          <li
            className={clsx(
              "p-2 flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded",
              {
                "bg-gray-200 hover:bg-gray-300": pathname === `/chat/${link.id}`,
              }
            )}
            key={link.id}
          >
            <div className="w-3/4">
              {link.editable ? (
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleNameChange(e, link.id)}
                  onKeyDown={(e) => userEnterSubmit(e) && handleEdit(link.id, true, link.name)}
                  className="w-full"
                />
              ) : (
                <Link className="inline-block w-full" href={`/chat/${link.id}`}>
                  {link.name}
                </Link>
              )}
            </div>
            <button
              onClick={() => handleEdit(link.id, false, link.name)}
              className="p-1 text-sm text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(link.id)}
              className="p-1 text-sm text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
