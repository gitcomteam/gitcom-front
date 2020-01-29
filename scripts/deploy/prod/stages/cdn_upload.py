import os.path, os
from ftplib import FTP, error_perm

from dotenv import load_dotenv
load_dotenv()

load_dotenv(verbose=True)

from pathlib import Path
env_path = Path('.') / '.env'

host = os.getenv("CDN_HOST")
port = 21

ftp = FTP()
ftp.connect(host,port)
ftp.login(os.getenv("CDN_LOGIN"), os.getenv("CDN_PASSWORD"))

def count_files(path):
    files_count = 0
    for name in os.listdir(path):
        localpath = os.path.join(path, name)
        if os.path.isfile(localpath):
            files_count += 1
        elif os.path.isdir(localpath):
            files_count += 1
            files_count += count_files(localpath)
    return files_count

def upload_folder(ftp, path, prefix = None):
    if prefix is not None:    
        progress = 0
        print("total files: " + str(count_files(path)) + " in " + path)
        root_dir = "/gitcom/" + prefix
        try:
            ftp.mkd(root_dir)
        except error_perm as e:
            print(e)
        ftp.cwd(root_dir)

    for name in os.listdir(path):
        localpath = os.path.join(path, name)
        if os.path.isfile(localpath):
            print("Storing ", name, localpath)
            ftp.storbinary('STOR ' + name, open(localpath,'rb'))
        elif os.path.isdir(localpath):
            print("MKD", name)

            try:
                ftp.mkd(name)
            except error_perm as e:
                print(e)

            print("CWD", name)
            ftp.cwd(name)
            upload_folder(ftp, localpath)
            print("CWD", "..")
            ftp.cwd("..")

upload_folder(ftp, "build", "public/")

ftp.quit()
