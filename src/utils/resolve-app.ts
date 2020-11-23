import path from 'path';

export function resolveApp(segment: string): string {
  return path.join(process.cwd(), segment);
}
