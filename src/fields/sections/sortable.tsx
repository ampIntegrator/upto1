'use client';

/**
 * Tri par glisser-déposer du constructeur de sections, sur dnd-kit, en un seul endroit :
 * mêmes capteurs, mêmes animations et mêmes contraintes pour les rangées (axe vertical), les
 * colonnes d'une rangée (axe horizontal) et l'ordre mobile de la section (axe vertical).
 *
 *   - souris : démarre après 5 px de mouvement (un clic reste un clic) ;
 *   - tactile : appui de 200 ms ; clavier : Espace pour saisir, flèches, Espace pour poser ;
 *   - stratégie de tri propre à l'axe, qui tient compte des tailles différentes des éléments ;
 *   - déplacement bloqué sur l'axe et à l'intérieur du conteneur.
 *
 * On n'utilise pas le DraggableSortable de Payload : il est prévu pour des éléments de même
 * taille et ne permet ni de choisir la stratégie ni de contraindre le déplacement.
 */
import {closestCenter, DndContext, type DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToHorizontalAxis, restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

/** Ce qu'un élément triable reçoit : à poser sur la poignée (attributes, listeners) et sur l'élément (setNodeRef, transform, transition). */
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
