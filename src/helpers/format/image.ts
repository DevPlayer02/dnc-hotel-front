type SrcType = string | Record<string, any> | null | undefined;

function stripSlashStart(s: string): string { return s.replace(/^\/+/, ""); }
function stripSlashEnd(s: string): string { return s.replace(/\/+$/, ""); }

const TINY_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAKbV0YMAAAAASUVORK5CYII=";

export type UploadPathKey = "hotel" | "avatar" | string;

export interface NormalizeOptions {
  base?: string;
  uploadsPath?: UploadPathKey | string;
  placeholder?: string;
}

const UPLOAD_PATHS: Record<string, string> = {
    "hotel": "/uploads-hotel",
    "avatar": "/uploads",
};


export function normalizeImageSrc(input?: SrcType, options?: NormalizeOptions): string {
  const envBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  const base = (options?.base ?? envBase ?? "http://localhost:3000").toString();
  const placeholder = options?.placeholder ?? TINY_PLACEHOLDER;

  if (!input) return placeholder;

  let uploadsPath: string;
  if (typeof options?.uploadsPath === 'string' && options.uploadsPath.startsWith('/')) {
      uploadsPath = options.uploadsPath;
  } else {
      const key = (options?.uploadsPath as UploadPathKey) ?? 'avatar';
      uploadsPath = UPLOAD_PATHS[key] ?? UPLOAD_PATHS['avatar'];
  }

  const buildUrl = (pathSegment: string) => 
    `${stripSlashEnd(base)}/${stripSlashStart(uploadsPath)}/${stripSlashStart(pathSegment)}`;


  if (typeof input === "string") {
    const s = input.trim();
    if (!s) return placeholder;
    if (/^https?:\/\/|blob:/i.test(s)) return s; 
    if (s.startsWith("/")) return s;
    return buildUrl(s);
  }

  if (typeof input === "object") {
    const obj: Record<string, any> = input;
    
    if (typeof obj.url === "string" && obj.url) return normalizeImageSrc(obj.url, options);
    if (typeof obj.src === "string" && obj.src) return normalizeImageSrc(obj.src, options);
    if (typeof obj.path === "string" && obj.path) {
      const p = obj.path;
      if (/^https?:\/\//i.test(p) || p.startsWith("/")) return p;
      return buildUrl(p);
    }

    const filename = obj.filename ?? obj.fileName ?? obj.name ?? obj.image ?? obj.key;
    if (filename && typeof filename === "string") {
      return buildUrl(filename);
    }

    if (obj.id && obj.name) {
      return buildUrl(`${obj.id}/${obj.name}`);
    }
  }

  return placeholder;
}