import http from 'node:http';
import { readFile, stat, watch } from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../',import.meta.url));
const output = path.join(root,'dist');
const execute = promisify(execFile);
async function build() {
  const result = await execute(process.execPath,[path.join(root,'scripts/build.mjs')],{cwd:root});
  process.stdout.write(result.stdout);
}
await build();
const base = new URL(process.env.SITE_URL || 'https://rohlfinglabs.com/').pathname.replace(/\/?$/, '/');
const port = Number(process.env.PORT || 4321);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server = http.createServer(async(req,res)=>{
  try {
    const requested = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const relative = base !== '/' && requested.startsWith(base) ? requested.slice(base.length) : requested.slice(1);
    const target = path.resolve(output,relative);
    if (!target.startsWith(output + path.sep) && target !== output) { res.writeHead(403); res.end(); return; }
    const info = await stat(target);
    if (info.isDirectory() && !requested.endsWith('/')) { res.writeHead(301,{Location:requested+'/'}); res.end(); return; }
    const file = info.isDirectory() ? path.join(target,'index.html') : target;
    const data = await readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(output,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}${base}`));
if (process.argv.includes('--watch')) {
  let timer;
  let building = false;
  let queued = false;
  const rebuild = async () => {
    if (building) { queued = true; return; }
    building = true;
    try { await build(); } catch(error) { console.error(error); }
    finally { building = false; if (queued) { queued = false; await rebuild(); } }
  };
  for (const folder of ['src','public']) {
    (async()=>{
      for await (const event of watch(path.join(root,folder),{recursive:true})) {
        clearTimeout(timer); timer = setTimeout(rebuild,150);
      }
    })().catch(console.error);
  }
  console.log('Watching src/ and public/. Refresh the browser after edits. Restart for config or build script changes.');
}
