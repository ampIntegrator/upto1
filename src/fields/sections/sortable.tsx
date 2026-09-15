'use client';

/**
 * Drag-and-drop sorting for the section builder, on dnd-kit, in a single place:
 * same sensors, same animations and same constraints for rows (vertical axis),
 * a row's columns (horizontal axis) and the section's mobile order (vertical axis).
 *
 *   - mouse: starts after 5 px of movement (a click stays a click);
 *   - touch: 200 ms press; keyboard: Space to pick up, arrows, Space to drop;
 *   - sorting strategy specific to the axis, which accounts for items of different sizes;
 *   - movement locked to the axis and inside the container.
 *
 * Payload's DraggableSortable is not used: it is designed for items of the same
 * size and allows neither choosing the strategy nor constraining movement.
 */
import {closestCenter, DndContext, type DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToHorizontalAxis, restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

/** What a sortable item receives: to set on the handle (attributes, listeners) and on the item (setNodeRef, transform, transition). */
export type SortableHandle = {
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: React.DOMAttributes<HTMLElement>;
  setNodeRef: (node: HTMLElement | null) => void;
  transform?: string;
  transition?: string;
  isDragging: boolean;
};

const TRANSITION = {duration: 250, easing: 'cubic-bezier(0, 0.2, 0.2, 1)'};

export function SortableList({ids, axis, onMove, className, role, children}: {ids: string[]; axis: 'x' | 'y'; onMove: (from: number, to: number) => void; className?: string; role?: string; children: React.ReactNode}) {
  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {distance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 200, tolerance: 5}}),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates}),
  );
  const onDragEnd = ({active, over, activatorEvent}: DragEndEvent) => {
    activatorEvent.stopPropagation();
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from >= 0 && to >= 0) onMove(from, to);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[axis === 'x' ? restrictToHorizontalAxis : restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={axis === 'x' ? horizontalListSortingStrategy : verticalListSortingStrategy}>
        <div className={className} role={role}>
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function SortableItem({id, disabled, children}: {id: string; disabled?: boolean; children: (handle: SortableHandle) => React.ReactNode}) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id, disabled, transition: TRANSITION});
  return (
    <>
      {children({
        attributes: attributes as unknown as React.HTMLAttributes<HTMLElement>,
        listeners: (listeners ?? {}) as unknown as React.DOMAttributes<HTMLElement>,
        setNodeRef,
        transform: CSS.Translate.toString(transform),
        transition,
        isDragging,
      })}
    </>
  );
}
