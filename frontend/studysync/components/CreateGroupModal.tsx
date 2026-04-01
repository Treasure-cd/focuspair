"use client"
import React, { useState, useRef, useEffect } from 'react'
import {
  XIcon,
  UsersThreeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  PlusIcon,
  XCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react'

export interface Member {
  id: string
  name: string
  username: string
  avatarInitials?: string
}

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: { name: string; members: Member[] }) => void
}


const MemberChip = ({
  member,
  onRemove,
}: {
  member: Member
  onRemove: (id: string) => void
}) => (
  <span className="flex items-center gap-1.5 bg-primary/10 border border-primary/25 text-primary rounded-full pl-2 pr-1 py-0.5 text-xs font-semibold whitespace-nowrap">
    {member.avatarInitials ?? member.name[0].toUpperCase()}
    <span className="max-w-28 truncate">{member.name}</span>
    <button
      type="button"
      onClick={() => onRemove(member.id)}
      className="ml-0.5 rounded-full hover:text-red-400 transition-colors focus:outline-none"
      aria-label={`Remove ${member.name}`}
    >
      <XIcon size={12} weight="bold" />
    </button>
  </span>
)


export const ResultRow = ({
  member,
  selected,
  onToggle,
}: {
  member: Member
  selected: boolean
  onToggle: (m: Member) => void
}) => (
  <button
    type="button"
    onClick={() => onToggle(member)}
    className={[
      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
      'transition-colors duration-100 focus:outline-none',
      selected
        ? 'bg-primary/10 text-primary'
        : 'hover:bg-hover text-foreground',
    ].join(' ')}
  >
    {/* Avatar circle */}
    <span
      className={[
        'shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold',
        selected
          ? 'bg-primary text-white'
          : 'bg-offbackground border border-bordercolor text-foreground/60',
      ].join(' ')}
    >
      {member.avatarInitials ?? member.name[0].toUpperCase()}
    </span>

    <div className="flex flex-col min-w-0">
      <span className="text-sm font-semibold leading-tight truncate">{member.name}</span>
      <span className="text-xs text-foreground/45 truncate">@{member.username}</span>
    </div>

    <span className="ml-auto shrink-0">
      {selected ? (
        <CheckCircleIcon size={18} weight="fill" className="text-primary" />
      ) : (
        <PlusIcon size={16} weight="bold" className="text-foreground/30" />
      )}
    </span>
  </button>
)


const CreateGroupModal = ({ isOpen, onClose, onSubmit }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('')
  const [memberQuery, setMemberQuery] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const [searchFocused, setSearchFocused] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 80)
    } else {
      setGroupName('')
      setMemberQuery('')
      setSelectedMembers([])
      setSearchFocused(false)
    }
  }, [isOpen])


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const toggleMember = (m: Member) => {
    setSelectedMembers((prev) =>
      prev.find((x) => x.id === m.id)
        ? prev.filter((x) => x.id !== m.id)
        : [...prev, m]
    )
  }

  const removeMember = (id: string) =>
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id))

  const handleSubmit = () => {
    if (!groupName.trim()) return
    onSubmit?.({ name: groupName.trim(), members: selectedMembers })
    onClose()
  }

  const showSearchPanel = searchFocused && memberQuery.trim().length > 0

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-darkbackground/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create a study group"
        className={[
          'fixed z-50 inset-x-4 top-[50%] -translate-y-1/2',
          'sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-md',
          'bg-background border border-bordercolor rounded-2xl shadow-2xl',
          'flex flex-col overflow-hidden',
        ].join(' ')}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-bordercolor">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/shrink-0">
            <UsersThreeIcon size={20} weight="duotone" className="text-primary" />
          </span>
          <div>
            <h2 className="font-heading font-bold text-base leading-tight">Create a Group</h2>
            <p className="text-xs text-foreground/45 mt-0.5">Start studying together</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg hover:bg-hover text-foreground/40 hover:text-foreground transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <XIcon size={18} weight="bold" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-5 flex flex-col gap-5">

          {/* Group Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50 font-heading">
              Group Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Organic Chemistry Squad"
              maxLength={60}
              className={[
                'w-full rounded-lg px-3.5 py-2.5 text-sm',
                'bg-offbackground border',
                groupName.trim().length > 0
                  ? 'border-primary/50 ring-1 ring-primary/20'
                  : 'border-bordercolor',
                'text-foreground placeholder:text-foreground/30',
                'focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/25',
                'transition-all duration-150',
              ].join(' ')}
            />
            <span className="text-right text-[10px] text-foreground/30 tabular-nums">
              {groupName.length}/60
            </span>
          </div>

          {/* Add Members */}
          <div className="flex flex-col gap-1.5" ref={searchRef}>
            <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50 font-heading">
              Add Members
            </label>

            {/* Selected chips */}
            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-1">
                {selectedMembers.map((m) => (
                  <MemberChip key={m.id} member={m} onRemove={removeMember} />
                ))}
              </div>
            )}

            {/* Search input */}
            <div className="relative">
              <MagnifyingGlassIcon
                size={16}
                weight="bold"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/35 pointer-events-none"
              />
              <input
                type="text"
                value={memberQuery}
                onChange={(e) => setMemberQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search by name or username…"
                className={[
                  'w-full rounded-lg pl-9 pr-3.5 py-2.5 text-sm',
                  'bg-offbackground border border-bordercolor',
                  'text-foreground placeholder:text-foreground/30',
                  'focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/25',
                  'transition-all duration-150',
                ].join(' ')}
              />
            </div>

            {/* Results panel — only when there's a query */}
            {showSearchPanel && (
              <div className="border border-bordercolor rounded-xl bg-background shadow-lg overflow-hidden">
                {/* Empty state placeholder — replace with real results */}
                <div className="px-4 py-8 flex flex-col items-center gap-2 text-center">
                  <UserCircleIcon size={32} weight="duotone" className="text-foreground/20" />
                  <p className="text-sm text-foreground/40">
                    No results for <span className="font-semibold text-foreground/60">"{memberQuery}"</span>
                  </p>
                  <p className="text-xs text-foreground/30">Try a different name or username</p>
                </div>

                {/*
                  ── When you have real data, replace the empty state above
                     with a mapped list like this:

                  {results.map((m) => (
                    <ResultRow
                      key={m.id}
                      member={m}
                      selected={!!selectedMembers.find((s) => s.id === m.id)}
                      onToggle={toggleMember}
                    />
                  ))}
                */}
              </div>
            )}

            <p className="text-[11px] text-foreground/35 mt-0.5">
              Optional — you can always add members after creating the group.
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-bordercolor bg-offbackground/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-foreground/55 hover:bg-hover hover:text-foreground transition-colors focus:outline-none"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!groupName.trim()}
            className={[
              'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold',
              'transition-all duration-150 focus:outline-none',
              groupName.trim()
                ? 'bg-primary text-white hover:bg-primary/85 shadow-md shadow-primary/20'
                : 'bg-offbackground text-foreground/30 border border-bordercolor cursor-not-allowed',
            ].join(' ')}
          >
            Create Group
            <ArrowRightIcon size={15} weight="bold" />
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateGroupModal