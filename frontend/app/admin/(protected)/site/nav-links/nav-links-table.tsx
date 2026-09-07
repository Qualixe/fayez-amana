"use client";

import { useState, useTransition, type DragEvent } from "react";
import Link from "next/link";
import { deleteNavLink, reorderNavLinks } from "./actions";

type Row = { id: string; label: string; href: string; show_in_primary_nav: boolean };

function DragHandleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="15" cy="6" r="1.4" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <circle cx="9" cy="18" r="1.4" />
      <circle cx="15" cy="18" r="1.4" />
    </svg>
  );
}

export default function NavLinksTable({ initialRows }: { initialRows: Row[] }) {
  const [rows, setRows] = useState(initialRows);
  const [dragId, setDragId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleDragStart(e: DragEvent<HTMLTableRowElement>, id: string) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(e: DragEvent<HTMLTableRowElement>, targetId: string) {
    e.preventDefault();
    if (!dragId || dragId === targetId) {
      setDragId(null);
      return;
    }
    const fromIndex = rows.findIndex((r) => r.id === dragId);
    const toIndex = rows.findIndex((r) => r.id === targetId);
    if (fromIndex === -1 || toIndex === -1) {
      setDragId(null);
      return;
    }
    const next = [...rows];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setRows(next);
    startTransition(() => {
      reorderNavLinks(next.map((r) => r.id));
    });
    setDragId(null);
  }

  function handleDelete(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
    startTransition(() => {
      deleteNavLink(id);
    });
  }

  return (
    <table className="w-full border-collapse text-start text-sm">
      <thead>
        <tr className="border-b border-steel font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
          <th className="w-8 py-2" />
          <th className="py-2 pe-4 text-start font-medium">Label</th>
          <th className="py-2 pe-4 text-start font-medium">Link</th>
          <th className="py-2 pe-4 text-start font-medium">Top bar</th>
          <th className="py-2 text-start font-medium" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.id}
            draggable
            onDragStart={(e) => handleDragStart(e, row.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, row.id)}
            onDragEnd={() => setDragId(null)}
            className={`border-b border-steel/60 transition-opacity ${dragId === row.id ? "opacity-40" : ""}`}
          >
            <td className="w-8 py-3 pe-2 cursor-grab text-ash active:cursor-grabbing" title="Drag to reorder">
              <DragHandleIcon />
            </td>
            <td className="py-3 pe-4 text-bone">{row.label}</td>
            <td className="py-3 pe-4 font-mono text-dust">{row.href}</td>
            <td className="py-3 pe-4 text-dust">{row.show_in_primary_nav ? "Yes" : "—"}</td>
            <td className="py-3 text-end">
              <div className="flex justify-end gap-4">
                <Link href={`/admin/site/nav-links/${row.id}`} className="text-azure-glow hover:underline">
                  Edit
                </Link>
                <button type="button" onClick={() => handleDelete(row.id)} className="text-amber-soft hover:underline">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
