import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { isImageUrl, type BlogBlock } from '@/lib/blog';

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-content grid grid-cols-12 items-start gap-x-6 gap-y-7">
      {blocks.map((block) => <div key={block.id} style={{ '--block-columns': block.width } as React.CSSProperties} className="blog-block col-span-12 min-w-0 wrap-anywhere">
        {block.type === 'heading' && (block.level === 2 ? <h2 className="font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">{block.text}</h2> : <h3 className="font-serif text-xl font-bold leading-snug text-foreground sm:text-2xl">{block.text}</h3>)}
        {block.type === 'paragraph' && <p className="whitespace-pre-wrap text-base leading-loose text-foreground/85">{block.text}</p>}
        {block.type === 'image' && <figure><div className={`relative overflow-hidden rounded-2xl bg-muted ${block.aspect === 'portrait' ? 'aspect-3/4' : block.aspect === 'square' ? 'aspect-square' : 'aspect-video'}`}><ImageWithFallback src={isImageUrl(block.src) ? block.src : null} alt={block.alt} fill unoptimized objectFit="contain" sizes="(max-width: 768px) 100vw, 900px" /></div>{block.caption && <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">{block.caption}</figcaption>}</figure>}
        {block.type === 'quote' && <blockquote className="rounded-r-2xl border-l-4 border-secondary bg-muted/60 px-6 py-5"><p className="whitespace-pre-wrap font-serif text-xl italic leading-relaxed text-primary">{block.text}</p>{block.attribution && <cite className="mt-3 block text-xs not-italic text-muted-foreground">— {block.attribution}</cite>}</blockquote>}
        {block.type === 'list' && <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/85">{block.items.filter((item) => item.trim()).map((item, index) => <li key={index}>{item}</li>)}</ul>}
        {block.type === 'callout' && <aside className="rounded-2xl border border-primary/10 bg-accent px-6 py-5 text-sm leading-loose whitespace-pre-wrap text-primary">{block.text}</aside>}
        {block.type === 'divider' && <hr className="my-3 border-border" />}
      </div>)}
    </div>
  );
}
