require('dotenv').config();

const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool.promise();
Last login: Fri Nov 22 10:52:52 on console
(base) samuelfahim@nbp-146-6 ~ % echo "# Group6SoftwareEngineering" >> README.md
(base) samuelfahim@nbp-146-6 ~ % git init

Initialized empty Git repository in /Users/samuelfahim/.git/
(base) samuelfahim@nbp-146-6 ~ % git add README.md
(base) samuelfahim@nbp-146-6 ~ % git commit -m "first commit"
[main (root-commit) 77bf130] first commit
 1 file changed, 2 insertions(+)
 create mode 100644 README.md
(base) samuelfahim@nbp-146-6 ~ % git branch -M main
(base) samuelfahim@nbp-146-6 ~ % git remote add origin https://github.com/jferrellRU/Group6SoftwareEngineering.git
(base) samuelfahim@nbp-146-6 ~ % git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 248 bytes | 248.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/jferrellRU/Group6SoftwareEngineering.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
(base) samuelfahim@nbp-146-6 ~ % ls
Applications
Applications (Parallels)
Creative Cloud Files
Creative Cloud Files mariemffouad@gmail.com da262dd854742c040bb962d7b63d8a9a2809598d7bd4cd489ee918be3fd562e1
Desktop
Documents
Downloads
Library
Messages
Movies
Music
My Drive
MyCLI
New Mindmap.mm
New Mindmap_files
Pictures
Postman
Public
README.md
bookstore-inventory.js
data
dev
dev-notes
developingApps
dotfiles
eclipse
eclipse-workspace
libcs50
mongodb-macos-aarch64-7.0.14
node-express-course
node_modules
note.js
nra
octave-workspace
opt
org-roam
package-lock.json
package.json
singly linked list
slakdfj
something.txt
somethingxcx.txt
tasks.js
uninstall.sh
vimrc
(base) samuelfahim@nbp-146-6 ~ % git clone https://github.com/jferrellRU/Group6SoftwareEngineering
Cloning into 'Group6SoftwareEngineering'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 0), reused 3 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (6/6), done.
(base) samuelfahim@nbp-146-6 ~ % ls
Applications
Applications (Parallels)
Creative Cloud Files
Creative Cloud Files mariemffouad@gmail.com da262dd854742c040bb962d7b63d8a9a2809598d7bd4cd489ee918be3fd562e1
Desktop
Documents
Downloads
Group6SoftwareEngineering
Library
Messages
Movies
Music
My Drive
MyCLI
New Mindmap.mm
New Mindmap_files
Pictures
Postman
Public
README.md
bookstore-inventory.js
data
dev
dev-notes
developingApps
dotfiles
eclipse
eclipse-workspace
libcs50
mongodb-macos-aarch64-7.0.14
node-express-course
node_modules
note.js
nra
octave-workspace
opt
org-roam
package-lock.json
package.json
singly linked list
slakdfj
something.txt
somethingxcx.txt
tasks.js
uninstall.sh
vimrc
(base) samuelfahim@nbp-146-6 ~ % cd Group6SoftwarEningeering
cd: no such file or directory: Group6SoftwarEningeering
(base) samuelfahim@nbp-146-6 ~ % ls
Applications
Applications (Parallels)
Creative Cloud Files
Creative Cloud Files mariemffouad@gmail.com da262dd854742c040bb962d7b63d8a9a2809598d7bd4cd489ee918be3fd562e1
Desktop
Documents
Downloads
Group6SoftwareEngineering
Library
Messages
Movies
Music
My Drive
MyCLI
New Mindmap.mm
New Mindmap_files
Pictures
Postman
Public
README.md
bookstore-inventory.js
data
dev
dev-notes
developingApps
dotfiles
eclipse
eclipse-workspace
libcs50
mongodb-macos-aarch64-7.0.14
node-express-course
node_modules
note.js
nra
octave-workspace
opt
org-roam
package-lock.json
package.json
singly linked list
slakdfj
something.txt
somethingxcx.txt
tasks.js
uninstall.sh
vimrc
(base) samuelfahim@nbp-146-6 ~ % cd dev
(base) samuelfahim@nbp-146-6 dev % ls
Healthcare_Accessibility_	file.java
LinkedListInt.java		hruf24
Lists				incomplete-academic
Raindrop.java			matlab-local
StdDraw.java			out
StdIn.java			partner_light
StdOut.class			practice.class
StdOut.java			practice.java
Task_Manager			practice2.class
Untitled			practice2.java
academic-projects		rut.class
appworkbook (1).key		swe-a1
bookstore-inventory.js		swe-a2
chuck-norris-jokes		swe-h4
contemplations			swe-hw2
cs111-a6-2			validator.js
cs112s23			weather-api
dev.iml				ytclone
file.class
(base) samuelfahim@nbp-146-6 dev % git clone https://github.com/jferrellRU/G6
Cloning into 'G6'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 0), reused 3 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (6/6), done.
(base) samuelfahim@nbp-146-6 dev % ls
# Group6SoftwareEngineering
G6				file.class
Healthcare_Accessibility_	file.java
LinkedListInt.java		hruf24
Lists				incomplete-academic
Raindrop.java			matlab-local
StdDraw.java			out
StdIn.java			partner_light
StdOut.class			practice.class
StdOut.java			practice.java
Task_Manager			practice2.class
Untitled			practice2.java
academic-projects		rut.class
appworkbook (1).key		swe-a1
bookstore-inventory.js		swe-a2
chuck-norris-jokes		swe-h4
contemplations			swe-hw2
cs111-a6-2			validator.js
cs112s23			weather-api
dev.iml				ytclone
(base) samuelfahim@nbp-146-6 dev % cd G6
(base) samuelfahim@nbp-146-6 G6 % ls
Clothing-Store-with-HTML-CSS-and-JS-master
README.md
(base) samuelfahim@nbp-146-6 G6 % vim README.md
(base) samuelfahim@nbp-146-6 G6 % giti commit -m "readme updated"
zsh: command not found: giti
(base) samuelfahim@nbp-146-6 G6 % git comit -m "readme updated"
git: 'comit' is not a git command. See 'git --help'.

The most similar command is
	commit
(base) samuelfahim@nbp-146-6 G6 % git branch -M main
(base) samuelfahim@nbp-146-6 G6 % git remote add origin https://github.com/jferrellRU/G6
error: remote origin already exists.
(base) samuelfahim@nbp-146-6 G6 % git remote add https://github.com/jferrellRU/G6
usage: git remote add [<options>] <name> <url>

    -f, --fetch           fetch the remote branches
    --tags                import all tags and associated objects when fetching
                          or do not fetch any tag at all (--no-tags)
    -t, --track <branch>  branch(es) to track
    -m, --master <branch>
                          master branch
    --mirror[=(push|fetch)]
                          set up remote as a mirror to push to or fetch from

(base) samuelfahim@nbp-146-6 G6 % git push
To https://github.com/jferrellRU/G6
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/jferrellRU/G6'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
(base) samuelfahim@nbp-146-6 G6 % git add .
(base) samuelfahim@nbp-146-6 G6 % git
usage: git [-v | --version] [-h | --help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone     Clone a repository into a new directory
   init      Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add       Add file contents to the index
   mv        Move or rename a file, a directory, or a symlink
   restore   Restore working tree files
   rm        Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect    Use binary search to find the commit that introduced a bug
   diff      Show changes between commits, commit and working tree, etc
   grep      Print lines matching a pattern
   log       Show commit logs
   show      Show various types of objects
   status    Show the working tree status

grow, mark and tweak your common history
   branch    List, create, or delete branches
   commit    Record changes to the repository
   merge     Join two or more development histories together
   rebase    Reapply commits on top of another base tip
   reset     Reset current HEAD to the specified state
   switch    Switch branches
   tag       Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch     Download objects and refs from another repository
   pull      Fetch from and integrate with another repository or a local branch
   push      Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.
(base) samuelfahim@nbp-146-6 G6 % git clone https://github.com/jferrellRU/G6
fatal: unable to get current working directory: Operation not permitted
(base) samuelfahim@nbp-146-6 G6 % cd ~
(base) samuelfahim@nbp-146-6 ~ % cd
(base) samuelfahim@nbp-146-6 ~ % cd .
(base) samuelfahim@nbp-146-6 ~ % cd ..
(base) samuelfahim@nbp-146-6 /Users % cd
(base) samuelfahim@nbp-146-6 ~ % git clone https://github.com/jferrellRU/G6
Cloning into 'G6'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 12 (delta 1), reused 3 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (12/12), 4.48 KiB | 4.48 MiB/s, done.
Resolving deltas: 100% (1/1), done.
(base) samuelfahim@nbp-146-6 ~ % cd dev
(base) samuelfahim@nbp-146-6 dev % git clone https://github.com/jferrellRU/G6
Cloning into 'G6'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 12 (delta 1), reused 3 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (12/12), 4.48 KiB | 4.48 MiB/s, done.
Resolving deltas: 100% (1/1), done.
(base) samuelfahim@nbp-146-6 dev % ls
G6				file.class
Healthcare_Accessibility_	file.java
LinkedListInt.java		hruf24
Lists				incomplete-academic
Raindrop.java			matlab-local
StdDraw.java			out
StdIn.java			partner_light
StdOut.class			practice.class
StdOut.java			practice.java
Task_Manager			practice2.class
Untitled			practice2.java
academic-projects		rut.class
appworkbook (1).key		swe-a1
bookstore-inventory.js		swe-a2
chuck-norris-jokes		swe-h4
contemplations			swe-hw2
cs111-a6-2			validator.js
cs112s23			weather-api
dev.iml				ytclone
(base) samuelfahim@nbp-146-6 dev % cd G6
(base) samuelfahim@nbp-146-6 G6 % ls
(base) samuelfahim@nbp-146-6 G6 % touch app.js
(base) samuelfahim@nbp-146-6 G6 % ls
app.js
(base) samuelfahim@nbp-146-6 G6 % vim app.js
(base) samuelfahim@nbp-146-6 G6 % git add .
(base) samuelfahim@nbp-146-6 G6 % git remote add origin https://github.com/jferrellRU/G6
error: remote origin already exists.
(base) samuelfahim@nbp-146-6 G6 % git push -u origin main
branch 'main' set up to track 'origin/main'.
Everything up-to-date
(base) samuelfahim@nbp-146-6 G6 % git commit -m "app.js file"
[main d6ce12f] app.js file
 1 file changed, 1 insertion(+)
 create mode 100644 app.js
(base) samuelfahim@nbp-146-6 G6 % git push -u origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Writing objects: 100% (3/3), 272 bytes | 272.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/jferrellRU/G6
   8994525..d6ce12f  main -> main
branch 'main' set up to track 'origin/main'.
(base) samuelfahim@nbp-146-6 G6 % git remote add origin https://github.com/jferrellRU/G
error: remote origin already exists.
(base) samuelfahim@nbp-146-6 G6 % git branch
* main
(base) samuelfahim@nbp-146-6 G6 % git branch b1
(base) samuelfahim@nbp-146-6 G6 % git switch b1
Switched to branch 'b1'
(base) samuelfahim@nbp-146-6 G6 % mkdir public
(base) samuelfahim@nbp-146-6 G6 % cd public
(base) samuelfahim@nbp-146-6 public % touch index.html
(base) samuelfahim@nbp-146-6 public % git add .
(base) samuelfahim@nbp-146-6 public % git commit -m "public folder"
[b1 8b9852f] public folder
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 public/index.html
(base) samuelfahim@nbp-146-6 public % git push -u origin b1
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (4/4), 327 bytes | 327.00 KiB/s, done.
Total 4 (delta 0), reused 1 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'b1' on GitHub by visiting:
remote:      https://github.com/jferrellRU/G6/pull/new/b1
remote:
To https://github.com/jferrellRU/G6
 * [new branch]      b1 -> b1
branch 'b1' set up to track 'origin/b1'.
(base) samuelfahim@nbp-146-6 public % cd .
(base) samuelfahim@nbp-146-6 public % cd ..
(base) samuelfahim@nbp-146-6 G6 % branch
zsh: command not found: branch
(base) samuelfahim@nbp-146-6 G6 % git branch
* b1
  main
(base) samuelfahim@nbp-146-6 G6 % git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
(base) samuelfahim@nbp-146-6 G6 % git branch
  b1
* main
(base) samuelfahim@nbp-146-6 G6 % mkdir config
(base) samuelfahim@nbp-146-6 G6 % cd config
(base) samuelfahim@nbp-146-6 config % touch db.js
