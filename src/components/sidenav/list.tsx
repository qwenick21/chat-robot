import clsx from "clsx";
import Link from "next/link";
import { userEnterSubmit } from "@/lib/util";
import { ChatRoom } from "@/lib/type";

interface Props {
  links: ChatRoom[];
  pathname: string;
  handleNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    href: string
  ) => void;
  handleEdit: (href: string) => void;
  handleDelete: (href: string) => void;
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
                "bg-gray-200 hover:bg-gray-300": pathname === link.href,
              }
            )}
            key={link.href}
          >
            <div className="w-3/4">
              {link.editable ? (
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleNameChange(e, link.href)}
                  onKeyDown={(e) => userEnterSubmit(e) && handleEdit(link.href)}
                  className="w-full"
                />
              ) : (
                <Link className="inline-block w-full" href={link.href}>
                  {link.name}
                </Link>
              )}
            </div>
            <button
              onClick={() => handleEdit(link.href)}
              className="p-1 text-sm text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(link.href)}
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
