"use client"
import React, { useState } from 'react'
import {
  BookOpenTextIcon,
  UsersThreeIcon,
  PlusIcon,
  UserPlusIcon,
  ArrowRightIcon,
  SparkleIcon,
} from '@phosphor-icons/react'
import { CardBase } from './ui/CardBase'


interface StudyGroup {
  id: string
  name: string
  memberCount: number
  subject?: string
}

interface StudyPickViewProps {
  groups?: StudyGroup[]
  onSelfStudy?: () => void
  onCreateGroup?: () => void
  onJoinGroup?: () => void
  onOpenGroup?: (id: string) => void
}



const StudyPickView = ({
  groups = [],
  onSelfStudy,
  onCreateGroup,
  onJoinGroup,
  onOpenGroup,
}: StudyPickViewProps) => {
  const hasGroups = groups.length > 0

  return (
    <section className="p-6 bg-offbackground rounded-lg">

      <div className="flex flex-wrap gap-4">

        <CardBase accent onClick={onSelfStudy}>
          <span
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/15"
          >
            <BookOpenTextIcon size={22} weight="duotone" className="text-white" />
          </span>

          <div className="flex flex-col gap-1">
            <span className="font-heading font-bold text-base leading-snug">
              Self Study
            </span>
            <span className="text-xs text-white/65 leading-relaxed">
              Solo focus sessions at your own pace.
            </span>
          </div>

          <ArrowRightIcon
            size={18}
            weight="bold"
            className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          />
        </CardBase>

        {!hasGroups && (
          <CardBase>
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-offbackground border border-bordercolor group-hover:border-primary/40 transition-colors">
              <UsersThreeIcon size={22} weight="duotone" className="text-foreground/50 group-hover:text-primary transition-colors" />
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-heading font-bold text-sm leading-snug text-foreground/80">
                No groups yet
              </span>
              <span className="text-xs text-foreground/45 leading-relaxed">
                Create or join a study group to collaborate.
              </span>
            </div>

            <div className="flex gap-2">
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); onCreateGroup?.() }}
                className="flex items-center gap-1 text-xs font-semibold text-primary border border-primary/30 rounded-md px-2 py-1 hover:bg-primary hover:text-white transition-all duration-150 cursor-pointer"
              >
                <PlusIcon size={11} weight="bold" /> Create
              </span>
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); onJoinGroup?.() }}
                className="flex items-center gap-1 text-xs font-semibold text-foreground/60 border border-bordercolor rounded-md px-2 py-1 hover:bg-hover transition-colors cursor-pointer"
              >
                <UserPlusIcon size={11} weight="bold" /> Join
              </span>
            </div>
          </CardBase>
        )}

        {hasGroups && groups.map((group) => (
          <CardBase key={group.id} onClick={() => onOpenGroup?.(group.id)}>
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <UsersThreeIcon size={22} weight="duotone" className="text-primary" />
            </span>

            <div className="flex flex-col gap-1 flex-1 mt-2">
              <span className="font-heading font-bold text-sm leading-snug line-clamp-1">
                {group.name}
              </span>
              {group.subject && (
                <span className="text-xs text-foreground/50 line-clamp-1">{group.subject}</span>
              )}
              <span className="text-xs text-foreground/40 mt-0.5">
                {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
              </span>
            </div>

            <ArrowRightIcon
              size={16}
              weight="bold"
              className="absolute top-5 right-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150"
            />
          </CardBase>
        ))}

        {hasGroups && (
          <CardBase dashed>
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-offbackground border border-bordercolor group-hover:border-primary/40 transition-colors">
              <SparkleIcon size={22} weight="duotone" className="text-foreground/40 group-hover:text-primary transition-colors" />
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-heading font-bold text-sm leading-snug text-foreground/70">
                Another group?
              </span>
              <span className="text-xs text-foreground/40 leading-relaxed">
                Create or join one more group.
              </span>
            </div>

            <div className="flex gap-2">
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); onCreateGroup?.() }}
                className="flex items-center gap-1 text-xs font-semibold text-primary border border-primary/30 rounded-md px-2 py-1 hover:bg-primary hover:text-white transition-all duration-150"
              >
                <PlusIcon size={11} weight="bold" /> Create
              </span>
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); onJoinGroup?.() }}
                className="flex items-center gap-1 text-xs font-semibold text-foreground/60 border border-bordercolor rounded-md px-2 py-1 hover:bg-hover transition-colors"
              >
                <UserPlusIcon size={11} weight="bold" /> Join
              </span>
            </div>
          </CardBase>
        )}

      </div>
    </section>
  )
}

export default StudyPickView