'use client';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHead } from './ui/Section';
import { StaggerContainer, staggerItem } from './ui/InteractiveEffects';
import ProjectDialog from './work/ProjectDialog';
import CadastraDemo from './work/CadastraDemo';
import DepthWizardDemo from './work/DepthWizardDemo';
import { CAPABILITIES, PROJECTS, type Capability, type Project } from '@/data/projects';

const DEMOS: Partial<Record<Project['id'], React.ComponentType>> = {
  cadastra: CadastraDemo,
  depth: DepthWizardDemo,
};

function RowBody({ p, dim }: { p: Project; dim: boolean }) {
  return (
    <>
      <span className="md:col-span-1 font-mono text-xs text-accent pt-2">{p.n}</span>
      <div className="md:col-span-5">
        <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
          {p.title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-wider text-muted mt-3">{p.tag}</p>
      </div>
      <div className="md:col-span-5">
        <p className="leading-relaxed text-ink/80">{p.summary}</p>
        <p className="font-mono text-xs text-muted mt-4">{p.tech.join(' · ')}</p>
        <p className="font-mono text-xs mt-2">{p.metrics.join('  ·  ')}</p>
      </div>
      <span aria-hidden className="md:col-span-1 md:text-right font-mono text-xs uppercase tracking-wider pt-2 text-muted group-hover:text-accent transition-colors">
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{p.href ? 'Read →' : 'Open →'}</span>
      </span>
      {dim && <span className="sr-only">(does not use the selected capability)</span>}
    </>
  );
}

export default function ProjectsSection() {
  const [openId, setOpenId] = useState<Project['id'] | null>(null);
  const [filter, setFilter] = useState<Capability | null>(null);
  const open = PROJECTS.find((p) => p.id === openId);
  const Demo = open ? DEMOS[open.id] : undefined;
  const close = useCallback(() => setOpenId(null), []);

  const rowClass =
    'group w-full text-left grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 md:py-11 px-3 -mx-3 transition-[background-color,box-shadow,transform] duration-200 hover:bg-paper-deep/70 hover:shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer';

  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="work">
      <SectionHead n="01" title="Selected work" />

      <div className="mb-10">
        <p id="cap-label" className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
          Filter by capability
        </p>
        <div role="group" aria-labelledby="cap-label" className="flex flex-wrap gap-2">
          {CAPABILITIES.map((c) => {
            const on = filter === c;
            const count = PROJECTS.filter((p) => p.capabilities.includes(c)).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(on ? null : c)}
                className={`press px-3 py-1.5 border font-mono text-[11px] uppercase tracking-wider ${
                  on ? 'bg-ink text-paper border-ink shadow-[2px_2px_0_var(--color-accent)]' : 'border-rule text-ink/75 hover:border-ink hover:text-ink'
                }`}
              >
                {c} <span className={on ? 'text-paper/60' : 'text-muted'}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <StaggerContainer as="ul" staggerDelay={0.12}>
        {PROJECTS.map((p) => {
          const dim = !!filter && !p.capabilities.includes(filter);
          return (
            <motion.li
              key={p.id}
              variants={staggerItem}
              className={`border-t border-rule last:border-b transition-opacity duration-300 ${dim ? 'opacity-30' : ''}`}
            >
              {p.href ? (
                <Link href={p.href} className={rowClass}>
                  <RowBody p={p} dim={dim} />
                </Link>
              ) : (
                <button type="button" onClick={() => setOpenId(p.id)} className={rowClass} aria-haspopup="dialog">
                  <RowBody p={p} dim={dim} />
                </button>
              )}
            </motion.li>
          );
        })}
      </StaggerContainer>

      <ProjectDialog open={!!open} title={open?.title ?? ''} eyebrow={open ? `${open.n} · ${open.tag}` : ''} onClose={close}>
        {Demo && <Demo />}
        {open?.repo && (
          <a href={open.repo} target="_blank" rel="noopener noreferrer" className="press btn-line self-start font-mono text-xs uppercase tracking-wider">
            Code on GitHub ↗
          </a>
        )}
      </ProjectDialog>
    </section>
  );
}
