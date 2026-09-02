import { AlertTriangle, Clock, Eye, FileText, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ZoomableImage } from "./zoomable-image";
import { GalleryImage } from "./gallery-image";
import type { PressRelease } from "@/lib/content/press-releases";

export function PressReleaseCard({ release }: { release: PressRelease }) {
  const isNotice = release.badge === "notice";

  const accent = isNotice
    ? {
        cardBorder: "border-yellow/30",
        topBar: "bg-yellow",
        badgeBg: "bg-yellow/10",
        badgeText: "text-yellow-dark",
        boxBorder: "border-yellow/30",
        boxBg: "bg-yellow/5",
        boxIcon: "text-yellow-dark",
        previewBtn: "bg-yellow text-slate-900 hover:bg-yellow-dark hover:text-white",
        outlineBtn: "hover:border-yellow-dark/50 hover:text-yellow-dark",
      }
    : {
        cardBorder: "border-slate-200/80",
        topBar: "bg-teal",
        badgeBg: "bg-teal/10",
        badgeText: "text-teal",
        boxBorder: "border-teal/20",
        boxBg: "bg-teal/5",
        boxIcon: "text-teal",
        previewBtn: "bg-teal text-white hover:bg-teal/90",
        outlineBtn: "hover:border-teal/50 hover:text-teal",
      };

  return (
    <Card className={`relative overflow-hidden border ${accent.cardBorder} bg-white p-6 shadow-sm sm:p-10 md:p-12`}>
      {isNotice && <div className={`absolute inset-x-0 top-0 h-1.5 ${accent.topBar}`} />}

      {/* Header */}
      <div className="border-b border-slate-100 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${accent.badgeBg} px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${accent.badgeText}`}
          >
            {isNotice ? <AlertTriangle className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            {release.badgeLabel}
          </span>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <MapPin className="h-4 w-4 text-teal" />
            <span>{release.location}</span>
          </div>
        </div>

        <h2 className="mt-5 text-2xl font-black leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {release.title}
        </h2>
      </div>

      {/* Banner image — click to enlarge */}
      <div className="mt-8">
        <ZoomableImage
          src={release.banner.src}
          alt={release.banner.alt}
          width={release.banner.width}
          height={release.banner.height}
          priority
        />
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-slate-700">
        {release.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {release.highlight && (
          <div className={`my-2 rounded-2xl border ${accent.boxBorder} ${accent.boxBg} p-5 text-slate-800`}>
            <div className="flex items-start gap-3">
              <Clock className={`mt-0.5 h-5 w-5 shrink-0 ${accent.boxIcon}`} />
              <div>
                <p className="font-semibold text-slate-900">{release.highlight.title}</p>
                <p className="mt-1">{release.highlight.body}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Downloadable images — click the eye to preview large, or the
          download icon to save that image straight away */}
      {release.images.length > 0 && (
        <div className="mt-10 border-t border-slate-100 pt-8">
          <div className={`grid gap-4 ${release.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {release.images.map((image, i) => (
              <GalleryImage key={i} image={image} />
            ))}
          </div>
        </div>
      )}

      {/* PDF / Word downloads for the full press release document */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={release.files.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${accent.previewBtn}`}
        >
          <Eye className="h-4 w-4" />
          Preview (PDF)
        </a>
        <a
          href={release.files.pdfUrl}
          download
          className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors ${accent.outlineBtn}`}
        >
          <FileText className="h-4 w-4" />
          Download PDF
        </a>
        <a
          href={release.files.docxUrl}
          download
          className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors ${accent.outlineBtn}`}
        >
          <FileText className="h-4 w-4" />
          Download Word File
        </a>
      </div>
    </Card>
  );
}