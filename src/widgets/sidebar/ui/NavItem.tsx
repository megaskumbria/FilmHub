import { type Collection } from "@/entities/collection/model";
import { ActionsMenu } from "@/features/collection-manage";
import Link from "next/link";

interface NavItemProps {
  collection: Collection;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export const NavItem = ({ collection, onEdit, onDelete }: NavItemProps) => {
  const handleDelete = () => {
    onDelete(collection.id);
  };

  return (
    <>
      <Link href="/" title={collection.name} className="block max-w-[180px] truncate">
        {collection.name}
      </Link>
      <ActionsMenu onDelete={handleDelete} onEdit={onEdit} />
    </>
  );
};
