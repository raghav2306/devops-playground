# 🧠 Awk Command - Basics and Usage

`awk` is a powerful command-line utility in Unix/Linux used for **pattern scanning** and **text processing**. It processes input line by line and can **extract columns**, **perform calculations**, and **format output**.

---

## 🔧 Basic Syntax

```bash
awk 'pattern { action }' filename
```

#Examples

```bash
awk -F: '{ print $1 }' /etc/passwd
# ':' is the delimiter; prints the first field (usually usernames)
```

```bash
awk -F',' '{ print $2 }' data.csv
# ',' is the delimiter; prints the second field from a CSV file
```

```bash
awk '/error/ { print $0 }' logfile.txt
# Prints lines that contain the word 'error'
```

# 🔐 SSH Command - Secure Shell
ssh is a command-line tool used to securely connect to remote servers over the network. It provides encrypted communication between two systems.

🔧 Basic Syntax

```bash
ssh [user@]hostname [command]
```
 -> user – Optional. The username to log in as.
-> hostname – The IP address or domain name of the remote machine.
-> command – Optional. Run a command on the remote server.


1. Use a Private Key for Authentication
```bash
ssh -i ~/.ssh/id_rsa user@host.com
# Uses a specific private key file for authentication
```

# 💽 Increase Disk Size on Ubuntu (Cloud VM)
If your VM disk was resized from the cloud provider side (e.g., AWS, Azure, or GCP), you'll need to extend the partition and filesystem manually.

🔧 Steps
1. Install Required Tools
   sudo apt install cloud-guest-utils

2. Extend the Partition
sudo growpart /dev/xvda 1
# Grows partition 1 on /dev/xvda

3. Resize the Filesystem
sudo resize2fs /dev/xvda1
# Resizes ext2/ext3/ext4 filesystem to use all available space

💡 If you're using xfs, replace resize2fs with:
sudo xfs_growfs /

## 📦 Tar Command — Create, Inspect, Extract (quick reference)

`tar` bundles files/directories into a single archive (a *tarball*). Add `-z` to gzip-compress it (produces `.tar.gz`). Common in backups and CI/CD artifacts.

---

### 🔧 Basic Syntax

```bash
tar [options] -f archive.tar[.gz] [files...]
```

**Common options**

* `-c` — **create** an archive
* `-x` — **extract** from an archive
* `-t` — **list** archive contents (inspect)
* `-z` — use **gzip** compression (`.tar.gz`)
* `-f <file>` — specify archive filename (must come last in the options)
* `-v` — verbose (show files as processed)
* `-C <dir>` — change to `<dir>` before extracting
* `--strip-components=N` — remove the first `N` path components when extracting
* `--exclude='PATTERN'` — skip files matching `PATTERN`
* `--remove-files` — remove original files after adding to archive (use carefully)

---

## ✅ Examples

### Create a gzipped archive of the `build/` folder

```bash
tar -czf release.tar.gz build
```

### Create archive including `node_modules` and `package.json`

```bash
tar -czf release.tar.gz build node_modules package.json
```

### Create archive but exclude any `.env` files

```bash
tar -czf release.tar.gz --exclude='*.env' build
```

### List the contents (inspect) — good to run before extracting

```bash
tar -tzf release.tar.gz | sed -n '1,50p'
```

### Extract archive into a directory

```bash
mkdir -p ~/deploy/current
tar -xzf /tmp/release.tar.gz -C ~/deploy/current
```

### Extract but remove the top-level folder inside the tar (useful if archive contains `build/` and you want its contents directly)

```bash
tar -xzf /tmp/release.tar.gz -C ~/deploy/current --strip-components=1
```

### Extract a single file from the archive

```bash
tar -xzf release.tar.gz path/inside/tar/specific-file.txt -C ~/Downloads
```

### Create an archive and delete originals (test first — destructive)

```bash
tar -czf release.tar.gz --remove-files build
```

---

## 🛡️ CI / Deploy tip (short)

1. Build on CI: `npm run build`
2. Create artifact: `tar -czf release.tar.gz build`
3. Upload artifact to deploy runner / server.
4. On server: inspect (`tar -tzf`), extract into timestamped `releases/<ts>` folder, then update a `current` symlink:

```bash
TS=$(date +%s)
mkdir -p ~/deploy/releases/$TS
tar -xzf /tmp/release.tar.gz -C ~/deploy/releases/$TS --strip-components=1
ln -sfn ~/deploy/releases/$TS ~/deploy/current
rm -f /tmp/release.tar.gz
```

---
