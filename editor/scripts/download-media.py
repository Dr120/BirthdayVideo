"""Download only the original Drive assets, verifying their recorded SHA-256."""
import concurrent.futures,hashlib,json,pathlib,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[1]
def download(item):
 dest=ROOT/'public/media'/item['name']; dest.parent.mkdir(parents=True,exist_ok=True)
 def valid(path):return path.exists() and hashlib.sha256(path.read_bytes()).hexdigest()==item['sha256']
 if valid(dest):return item['name']+' already verified'
 temp=dest.with_suffix(dest.suffix+'.part')
 subprocess.run(['curl','-L','--fail','--retry','2','--max-time','180','-sS',f"https://drive.usercontent.google.com/download?id={item['id']}&export=download&confirm=t",'-o',str(temp)],check=True)
 if not valid(temp):temp.unlink(missing_ok=True);raise RuntimeError('Download checksum mismatch: '+item['name'])
 temp.replace(dest);return item['name']+' downloaded and verified'
if __name__=='__main__':
 files=json.loads((ROOT/'scripts/drive-files.json').read_text())
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for result in pool.map(download,files):print(result,flush=True)
